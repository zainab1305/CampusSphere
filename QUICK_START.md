# 🚀 Quick Start Command Reference

## Frontend Setup & Run

```bash
# Navigate to frontend
cd frontend

# Install dependencies (first time only)
npm install

# Start development server
npm start

# Build for production
npm run build
```

**Frontend runs on:** `http://localhost:3000`

### Demo Login Credentials:

**Student Account:**
```
Email: student@example.com
Password: password123
```

**College Account:**
```
Email: college@example.com
Password: password123
```

---

## Backend Setup & Run (Level 3)

```bash
# Navigate to backend
cd backend

# Install dependencies (first time only)
npm install

# Create .env file from example
cp .env.example .env

# Edit .env with your settings
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key_here

# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

**Backend runs on:** `http://localhost:5000`

---

## Full-Stack Development Setup

### Terminal 1: Backend
```bash
cd CampusSphere/backend
npm install
npm run dev
```

### Terminal 2: Frontend
```bash
cd CampusSphere/frontend
npm install
npm start
```

This will:
- ✅ Start backend API on port 5000
- ✅ Start frontend dev server on port 3000
- ✅ Enable hot reloading for both
- ✅ Allow frontend to communicate with backend

---

## Testing the Application

### 1. Login as Student
- Go to http://localhost:3000/login
- Click "Student Demo" button OR enter:
  - Email: `student@example.com`
  - Password: `password123`
- You'll see the student dashboard with event listing

### 2. Test Student Features
- ⭐ Click "Bookmark" on any event card
- 🔍 Use search to filter events
- 🏷️ Filter by category
- 📌 Click "My Bookmarks" in navbar
- 📃 Click "View Details" on any event

### 3. Login as College
- Logout or open new incognito window
- Go to http://localhost:3000/login
- Click "College Demo" button OR enter:
  - Email: `college@example.com`
  - Password: `password123`
- You'll see college management features

### 4. Test College Features
- ➕ Click "Create Event" in navbar
- Fill out event form completely
- Submit to add new event
- New event will appear on dashboard

---

## Project File Structure

```
CampusSphere/
├── frontend/              # React application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Route pages
│   │   ├── context/      # State management
│   │   ├── hooks/        # Custom hooks
│   │   ├── data/         # Mock data
│   │   ├── styles/       # Global styles
│   │   └── App.js
│   └── package.json
│
├── backend/              # Express API (Level 3)
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth & validation
│   ├── config/          # Configuration
│   ├── server.js
│   └── package.json
│
├── README.md               # Project overview
├── SETUP_GUIDE.md          # Detailed setup guide
└── IMPLEMENTATION_CHECKLIST.md  # Feature tracking
```

---

## Useful Commands

### Install Specific Package
```bash
cd frontend
npm install axios
```

### Clear Node Modules
```bash
rm -rf node_modules
npm install
```

### View Running Processes
```bash
lsof -i :3000  # Frontend port
lsof -i :5000  # Backend port
```

### Kill Process on Port
```bash
# macOS/Linux
kill -9 $(lsof -t -i :3000)

# Windows (PowerShell)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## Common Issues & Solutions

### Issue: "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org

### Issue: "Cannot find module"
**Solution:** 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Port 3000 already in use"
**Solution:** Kill the process or use different port:
```bash
PORT=3001 npm start
```

### Issue: "MongoDB connection failed"
**Solution:**
- Ensure MongoDB is running
- Check connection string in .env
- Verify firewall settings
- Use MongoDB Atlas if local MongoDB fails

### Issue: "CORS error when calling API"
**Solution:**
- Backend CORS is already configured
- Check if backend is running on port 5000
- Verify API URL in frontend .env

---

## IDE Recommendations

**VS Code Extensions:**
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- MongoDB for VS Code
- Thunder Client (API testing)
- REST Client

---

## Documentation Files

- `README.md` - Project overview and features
- `SETUP_GUIDE.md` - Detailed setup instructions
- `IMPLEMENTATION_CHECKLIST.md` - Feature tracking
- `QUICK_START.md` - This file!

---

## Next Steps

1. ✅ Clone/download the project
2. ✅ Follow "Frontend Setup & Run" section
3. ✅ Open `http://localhost:3000` in browser
4. ✅ Test with demo credentials
5. ✅ Explore different features
6. ✅ (Optional) Set up backend following "Backend Setup & Run"

---

## Support

Having issues? Check:
1. Node.js version (should be v14+)
2. All dependencies installed (`npm list`)
3. Port 3000/5000 not already in use
4. Correct working directory
5. Environment variables set (.env file)

---

**Last Updated:** April 2026  
**Version:** 1.0.0  
**Status:** Ready to use! 🎉
