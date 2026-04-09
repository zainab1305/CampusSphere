# CampusSphere - Setup & Development Guide

## 📦 Project Overview

CampusSphere is a full-stack academic event management platform built with modern web technologies. It supports three implementation levels with progressive enhancement.

## 🎯 What's Included

### ✅ Level 1: Basic Authentication & Event Display
- User signup and login system
- Dashboard with event listing
- Static event data
- Clean, responsive UI

### ✅ Level 2: Role-Based Features
- Student role: Browse events, bookmark/save events
- College role: Create and manage events
- Event filtering and search
- Bookmark management

### ✅ Level 3: Production-Ready System
- Complete REST API backend (Node.js + Express)
- MongoDB database integration
- JWT-based authentication
- Clean code architecture with separation of concerns

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+) and npm installed
- MongoDB (local or Atlas)
- Git

### Frontend Setup (Levels 1-3)

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

The frontend will run on `http://localhost:3000`

**Demo Credentials for Testing:**
- **Student Account:**
  - Email: `student@example.com`
  - Password: `password123`
  
- **College Account:**
  - Email: `college@example.com`
  - Password: `password123`

### Backend Setup (Level 3 Only)

```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Update .env with your MongoDB URI
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key

# 5. Start development server
npm run dev
```

The backend will run on `http://localhost:5000`

---

## 📁 Project Structure

```
CampusSphere/
├── frontend/                          # React.js Application
│   ├── public/
│   │   └── index.html                # Main HTML file
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   │   ├── Navbar.js
│   │   │   ├── EventCard.js
│   │   │   └── EventForm.js
│   │   ├── pages/                    # Page components
│   │   │   ├── LoginPage.js
│   │   │   ├── SignupPage.js
│   │   │   ├── DashboardPage.js
│   │   │   ├── EventDetailPage.js
│   │   │   ├── CreateEventPage.js
│   │   │   ├── BookmarkedEventsPage.js
│   │   │   └── NotFoundPage.js
│   │   ├── context/                  # State management
│   │   │   ├── AuthContext.js        # Authentication state
│   │   │   └── EventContext.js       # Events state
│   │   ├── hooks/                    # Custom React hooks
│   │   │   └── useContext.js         # Hook for accessing contexts
│   │   ├── data/                     # Mock data
│   │   │   └── mockData.js           # Sample events and credentials
│   │   ├── styles/                   # Global styles
│   │   │   └── index.css
│   │   ├── App.js                    # Main App component with routing
│   │   └── index.js                  # React entry point
│   ├── package.json
│   └── .env.example
│
├── backend/                           # Node.js + Express API (Level 3)
│   ├── models/                       # MongoDB Schemas
│   │   ├── User.js                   # User model with authentication
│   │   ├── Event.js                  # Event model
│   │   └── Bookmark.js               # Bookmark model
│   ├── routes/                       # API endpoints
│   │   ├── auth.js                   # Authentication endpoints
│   │   ├── events.js                 # Event CRUD operations
│   │   └── bookmarks.js              # Bookmark endpoints
│   ├── middleware/                   # Express middleware
│   │   └── auth.js                   # JWT authentication & role checks
│   ├── config/                       # Configuration files
│   │   └── database.js               # MongoDB connection
│   ├── server.js                     # Main server file
│   ├── package.json
│   └── .env.example
│
├── README.md                         # Project documentation
├── .gitignore
└── SETUP_GUIDE.md                    # This file
```

---

## 🎨 Features by Level

### Level 1: Basic
- ✅ Signup/Login with role selection
- ✅ Dashboard showing all events
- ✅ Event listing with cards
- ✅ Responsive UI design
- ✅ Protected routes

### Level 2: Intermediate
- ✅ All Level 1 features
- ✅ Student: Browse and bookmark events
- ✅ College: Create new events
- ✅ Search and filter events by category
- ✅ Role-based UI rendering
- ✅ View bookmarked events

### Level 3: Advanced
- ✅ All Level 2 features
- ✅ Complete REST API with Express.js
- ✅ MongoDB database with Mongoose
- ✅ JWT authentication tokens
- ✅ Server-side role validation
- ✅ Clean separation of concerns
- ✅ Scalable architecture ready for production

---

## 🔐 Authentication Flow

### Frontend (Levels 1-3):
1. User fills signup/login form
2. Credentials are validated locally (Level 1-2) or sent to backend API (Level 3)
3. Upon success, user data is stored in Context API state
4. User is redirected to dashboard
5. Protected routes check authentication status

### Backend (Level 3):
1. User submits credentials
2. Backend validates against database
3. Password is compared using bcryptjs
4. JWT token is generated
5. Token is returned to frontend
6. Frontend stores token for future API requests

---

## 🛠️ Development Tips

### For Local Development:

**Frontend:**
- Hot reload enabled - changes reflect instantly
- Context API manages global state
- Mock data persists during session

**Backend:**
- Nodemon auto-restarts on file changes
- Use `.env` file for configuration
- Test endpoints with Postman/Insomnia

### Common Issues:

**"Port already in use"**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3000   # Windows
```

**"MongoDB connection error"**
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access if using MongoDB Atlas

**"CORS errors"**
- Backend CORS is configured to accept requests from localhost
- Update CORS settings in `backend/server.js` for production

---

## 📱 Responsive Design

The application is fully responsive:
- **Desktop**: Multi-column layouts, full navigation
- **Tablet**: Optimized grid layouts
- **Mobile**: Single column, hamburger menu ready

---

## 🎓 Learning Outcomes

By exploring this project, you'll understand:

1. **Frontend:**
   - React component architecture
   - React Context API for state management
   - React Router for navigation
   - Form handling and validation
   - Responsive CSS design

2. **Backend (Level 3):**
   - Express.js server setup
   - MongoDB and Mongoose ODM
   - RESTful API design
   - JWT authentication
   - Middleware and error handling
   - Role-based access control

3. **Full-Stack Concepts:**
   - Client-server communication
   - Database design
   - Authentication and authorization
   - Separation of concerns
   - Scalable architecture

---

## 📝 API Documentation (Level 3)

### Authentication Endpoints:
```
POST   /api/auth/signup     - Register new user
POST   /api/auth/login      - Login user
```

### Event Endpoints:
```
GET    /api/events          - Get all events
GET    /api/events/:id      - Get event by ID
POST   /api/events          - Create event (College only)
PUT    /api/events/:id      - Update event (College only)
DELETE /api/events/:id      - Delete event (College only)
GET    /api/events/user     - Get user's events (College only)
```

### Bookmark Endpoints:
```
GET    /api/bookmarks       - Get user's bookmarks (Student only)
POST   /api/bookmarks/:id   - Toggle bookmark (Student only)
DELETE /api/bookmarks/:id   - Remove bookmark (Student only)
```

---

## 🚀 Deployment

### Frontend (Vercel/Netlify):
```bash
npm run build
# Deploy the build/ folder
```

### Backend (Heroku/Railway):
```bash
git push heroku main
# Ensure .env variables are set on platform
```

---

## 📞 Support

For questions or issues:
1. Check the README.md for overview
2. Review component documentation in code comments
3. Test with provided demo credentials
4. Check browser console for errors

---

## 📄 License

This project is created for educational purposes.

**Created:** April 2026  
**Author:** Zainab  
**Happy Coding! 🚀**
