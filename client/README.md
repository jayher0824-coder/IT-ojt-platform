# 💻 Client - Frontend Components

## 📋 Directory Overview

```
client/
├── 📂 public/              # Web Interface Files
│   ├── 📂 admin/          # Admin dashboard components
│   ├── 📂 js/             # JavaScript applications
│   ├── index.html         # 🎓 Student portal (main)
│   ├── admin.html         # 👤 Admin dashboard
│   ├── auth-success.html  # 🔐 OAuth success page
│   ├── student-profile-modal.html  # Student profile popup
│   └── test-login.html    # 🧪 Login testing page
└── 📂 assets/             # Static Assets
    └── 📂 uploads/        # User uploaded files
```

## 🎯 Quick Navigation

### 🌐 Web Pages (`public/`)
- **Student Portal**: `index.html` - Main student interface
- **Admin Dashboard**: `admin.html` - Administrative control panel
- **Authentication**: `auth-success.html` - OAuth callback page
- **Testing**: `test-login.html` - Login functionality testing

### 📱 JavaScript Apps (`public/js/`)
- **Dashboard Logic**: `dashboard.js` - Admin dashboard functionality
- **Assessment System**: `assessment.js` - Student assessment interface
- **Core App**: `app.js` - Main application logic

### 📂 Admin Components (`public/admin/`)
- Specialized admin interface files and components

### 📁 Assets (`assets/`)
- **File Uploads**: `uploads/` - Student documents, profile pictures, etc.

## 🚀 Quick Access URLs

When server is running at `http://localhost:3000`:

| Interface | URL | Description |
|-----------|-----|-------------|
| **Student Portal** | `/` or `/index.html` | Main student interface |
| **Admin Dashboard** | `/admin.html` | Administrative panel |
| **Auth Success** | `/auth-success.html` | OAuth redirect page |
| **Profile Modal** | `/student-profile-modal.html` | Student profile popup |
| **Test Login** | `/test-login.html` | Login testing interface |

## 🎨 User Interfaces

### 🎓 Student Portal (`index.html`)
**Features:**
- Profile management
- Job search and applications
- Assessment taking
- Progress tracking
- Document uploads

### 👤 Admin Dashboard (`admin.html`)
**Features:**
- User management (students, companies)
- Job posting management
- Assessment creation/management
- System reports and analytics
- Content moderation

## 📱 JavaScript Architecture

### Core Files
```
js/
├── app.js          # Main application logic
├── dashboard.js    # Admin dashboard functionality
├── assessment.js   # Assessment system
└── ...            # Additional feature modules
```

### Development Patterns
- **Modular Structure**: Each major feature has its own JS file
- **Event-Driven**: Uses DOM events for user interactions
- **API Communication**: Fetch/Axios for backend communication
- **Responsive Design**: Mobile-friendly interfaces

## 🔧 Development Guidelines

### Adding New Features
1. **HTML Structure**: Add/modify in appropriate `.html` file
2. **JavaScript Logic**: Create/update in `js/` directory
3. **Assets**: Place static files in `assets/`
4. **Navigation**: Update links in main navigation

### File Organization
```
For new feature "job-matching":
├── job-matching.html       # New page (if needed)
├── js/job-matching.js      # Feature logic
└── assets/job-matching/    # Feature assets
```

### Best Practices
- **Semantic HTML**: Use proper HTML5 elements
- **Progressive Enhancement**: Work without JavaScript
- **Accessibility**: ARIA labels, keyboard navigation
- **Performance**: Optimize images, minify assets

## 🎨 UI/UX Guidelines

### Design Principles
- **User-Centered**: Focus on student/admin workflows
- **Consistent**: Uniform look and feel across pages
- **Responsive**: Mobile-first design approach
- **Accessible**: WCAG compliance for all users

### Component Structure
- **Header**: Navigation and user info
- **Main Content**: Primary interface area
- **Sidebar**: Secondary navigation/info
- **Footer**: Links and system info

---

*💡 Main entry point: `public/index.html`*
