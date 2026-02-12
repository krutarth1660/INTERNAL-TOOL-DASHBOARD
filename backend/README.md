# Internal Dashboard - Backend (Payload CMS)

Backend API and admin panel for the Internal Tool Dashboard built with Payload CMS.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas account

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```env
DATABASE_URI=mongodb://localhost:27017/internal-dashboard
PAYLOAD_SECRET=your-secret-key-min-32-characters-long
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:4000
PORT=4000
FRONTEND_URL=http://localhost:3000
```

4. Seed the database:
```bash
npm run seed
```

5. Start development server:
```bash
npm run dev
```

The backend will be available at:
- API: http://localhost:4000/api
- Admin Panel: http://localhost:4000/admin

## 📝 Default Login Credentials

After seeding, use these credentials:

- **Admin**: admin@example.com / admin123
- **Manager**: manager@example.com / manager123
- **Employee**: employee1@example.com / employee123

## 📚 API Endpoints

### Authentication
- `POST /api/users/login` - Login
- `POST /api/users/logout` - Logout
- `GET /api/users/me` - Get current user

### Collections
- `GET /api/users` - List users
- `GET /api/employees` - List employees
- `GET /api/projects` - List projects
- `GET /api/tasks` - List tasks
- `GET /api/leave-requests` - List leave requests

All endpoints support:
- Filtering: `?where[field][equals]=value`
- Sorting: `?sort=-createdAt`
- Pagination: `?limit=10&page=1`
- Depth: `?depth=1` (populate relationships)

## 🔐 Access Control

Access control is enforced at the collection level:

### Users
- Admin: Full CRUD
- Manager: Read all, update self
- Employee: Read self, update self

### Employees
- Admin: Full CRUD
- Manager: Read all
- Employee: Read self

### Projects
- Admin: Full CRUD
- Manager: Create, read all, update own
- Employee: Read assigned

### Tasks
- Admin: Full CRUD
- Manager: Full CRUD
- Employee: Read assigned, update status

### Leave Requests
- Admin: Full CRUD
- Manager: Read all, approve/reject
- Employee: Create own, read own, update pending

## 🛠️ Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data
- `npm run generate:types` - Generate TypeScript types

## 📁 Project Structure

```
backend/
├── src/
│   ├── collections/        # Payload collections
│   ├── access/            # Access control helpers
│   ├── hooks/             # Payload hooks
│   ├── seed/              # Database seeding
│   ├── payload.config.ts  # Payload configuration
│   └── server.ts          # Express server
├── .env                   # Environment variables
└── package.json
```

## 🚢 Deployment

### Railway

1. Create new project on Railway
2. Add MongoDB service
3. Add environment variables
4. Deploy from GitHub

### Heroku

1. Create new app
2. Add MongoDB Atlas add-on
3. Set environment variables
4. Deploy from GitHub

## 📖 Documentation

- [Payload CMS Docs](https://payloadcms.com/docs)
- [Access Control Guide](https://payloadcms.com/docs/access-control/overview)
