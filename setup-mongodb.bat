@echo off
echo ========================================
echo MongoDB Setup Helper
echo ========================================
echo.
echo You need MongoDB to run this application.
echo.
echo OPTION 1: MongoDB Atlas (Cloud - RECOMMENDED)
echo   - No installation required
echo   - Free tier available
echo   - Setup guide: MONGODB_SETUP.md
echo.
echo OPTION 2: Local MongoDB
echo   - Requires installation
echo   - Download from: mongodb.com/try/download/community
echo.
echo ========================================
echo.
echo Please choose an option:
echo.
echo 1. I want to use MongoDB Atlas (Cloud)
echo 2. I have MongoDB installed locally
echo 3. Exit
echo.
set /p choice="Enter your choice (1, 2, or 3): "

if "%choice%"=="1" goto atlas
if "%choice%"=="2" goto local
if "%choice%"=="3" goto end

:atlas
echo.
echo ========================================
echo MongoDB Atlas Setup
echo ========================================
echo.
echo Follow these steps:
echo.
echo 1. Go to: https://www.mongodb.com/cloud/atlas
echo 2. Create a free account
echo 3. Create a free cluster (M0)
echo 4. Create a database user
echo 5. Whitelist your IP (0.0.0.0/0 for development)
echo 6. Get your connection string
echo.
echo Your connection string will look like:
echo mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/internal-dashboard
echo.
echo.
set /p connstr="Paste your connection string here: "
echo.
echo Updating backend/.env file...
echo DATABASE_URI=%connstr% > backend\.env.temp
echo PAYLOAD_SECRET=this-is-a-super-secret-key-with-more-than-32-characters-long >> backend\.env.temp
echo PAYLOAD_PUBLIC_SERVER_URL=http://localhost:4000 >> backend\.env.temp
echo PORT=4000 >> backend\.env.temp
echo NODE_ENV=development >> backend\.env.temp
echo FRONTEND_URL=http://localhost:3000 >> backend\.env.temp
move /y backend\.env.temp backend\.env >nul
echo.
echo ✅ Configuration updated!
echo.
goto seed

:local
echo.
echo ========================================
echo Local MongoDB Setup
echo ========================================
echo.
echo Checking if MongoDB is installed...
mongosh --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ❌ MongoDB is not installed!
    echo.
    echo Please install MongoDB:
    echo 1. Download from: https://www.mongodb.com/try/download/community
    echo 2. Run the installer
    echo 3. Start MongoDB service
    echo 4. Run this script again
    echo.
    pause
    goto end
)
echo.
echo ✅ MongoDB is installed!
echo.
echo Using local MongoDB connection...
echo DATABASE_URI=mongodb://localhost:27017/internal-dashboard
echo.
goto seed

:seed
echo.
echo ========================================
echo Seeding Database
echo ========================================
echo.
echo Installing backend dependencies...
cd backend
call npm install
echo.
echo Seeding database with sample data...
call npm run seed
echo.
if errorlevel 1 (
    echo.
    echo ❌ Seeding failed!
    echo.
    echo Please check:
    echo 1. MongoDB connection string is correct
    echo 2. MongoDB is accessible
    echo 3. Check backend/.env file
    echo.
    echo For help, see: MONGODB_SETUP.md
    echo.
) else (
    echo.
    echo ========================================
    echo ✅ Setup Complete!
    echo ========================================
    echo.
    echo You can now start the application:
    echo.
    echo 1. Start backend:  cd backend ^&^& npm run dev
    echo 2. Start frontend: cd frontend ^&^& npm run dev
    echo.
    echo Or use: start-dev.bat
    echo.
    echo Login credentials:
    echo   Admin: admin@example.com / admin123
    echo.
)
cd ..
pause
goto end

:end
