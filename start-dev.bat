@echo off
echo ========================================
echo Internal Dashboard - Development Setup
echo ========================================
echo.

echo Checking if backend is set up...
if not exist "backend\node_modules" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

echo.
echo Checking if frontend is set up...
if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

echo.
echo ========================================
echo Starting Development Servers
echo ========================================
echo.
echo Backend will run on: http://localhost:4000
echo Frontend will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop both servers
echo.

start "Backend Server" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak >nul
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Servers are starting...
echo ========================================
echo.
echo Backend: http://localhost:4000/admin
echo Frontend: http://localhost:3000
echo.
echo Login with: admin@example.com / admin123
echo.
