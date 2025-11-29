# 🖥️ Server - Backend Components

## 📋 Directory Overview

```
server/
├── 📂 config/          # Configuration Files
│   ├── .env           # Environment variables
│   ├── client_secret_*.json  # Google OAuth credentials
│   └── start-mongodb.bat     # MongoDB startup script
├── 📂 auth/           # Authentication Components
│   ├── 📂 google-auth/ # Google OAuth setup
│   └── 📂 middleware/  # Auth middleware functions
├── 📂 database/       # Database Layer
│   └── 📂 models/     # Mongoose data models
├── 📂 api/            # API Layer
│   └── 📂 routes/     # Express route handlers
└── server.js          # 🚀 Main server entry point
```

## 🎯 Quick Navigation

### ⚙️ Configuration (`config/`)
- **Environment Setup**: `.env` - Database URLs, JWT secrets, etc.
- **OAuth Credentials**: `client_secret_*.json` - Google authentication
- **Database Startup**: `start-mongodb.bat` - MongoDB launcher

### 🔐 Authentication (`auth/`)
- **Google OAuth**: `google-auth/` - OAuth 2.0 configuration
- **Security Middleware**: `middleware/` - Request validation & protection

### 💾 Database (`database/`)
- **Data Models**: `models/` - User, Student, Company, Job, Assessment schemas

### 🌐 API (`api/`)
- **Route Handlers**: `routes/` - RESTful API endpoints

## 🚀 Getting Started

1. **Configure Environment**:
   ```bash
   # Edit server/config/.env
   MONGODB_URI=your_mongodb_connection
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   ```

2. **Start Database**:
   ```bash
   ./config/start-mongodb.bat
   ```

3. **Run Server**:
   ```bash
   # From project root
   npm start
   ```

## 📝 Development Guidelines

### Adding New Features
1. **Data Model**: Create/modify in `database/models/`
2. **API Routes**: Add endpoints in `api/routes/`
3. **Authentication**: Update middleware in `auth/`
4. **Configuration**: Update environment variables in `config/`

### File Naming Conventions
- **Models**: PascalCase (e.g., `User.js`, `StudentProfile.js`)
- **Routes**: kebab-case (e.g., `user-routes.js`, `company-routes.js`)
- **Middleware**: camelCase (e.g., `authMiddleware.js`, `errorHandler.js`)

---

*💡 Main server entry point: `server.js`*
