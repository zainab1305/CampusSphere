# CampusSphere (UAIP)

CampusSphere is a full-stack Unified Academic Interaction Platform (UAIP) that centralizes verified academic opportunities across three roles: `admin`, `college`, and `student`.

## Project Synopsis Alignment

### Core vision
Single source of truth for academic opportunities so students do not miss important events.

### Three-role model
1. Admin: verifies and moderates event submissions.
2. College: publishes and manages event submissions.
3. Student: consumes approved content, bookmarks events, and registers.

### MVP capabilities implemented
1. Centralized event management.
2. Role-based dashboards and routes.
3. Bookmark and tracking system.
4. Approval workflow for content visibility.
5. Responsive UI with reusable components.

## Tech Stack

1. Frontend: React 18, React Router 6, Axios, Context API, CSS.
2. Backend: Node.js, Express, JWT, bcryptjs.
3. Database: MongoDB with Mongoose.

## Current Architecture

```text
frontend (React)
  -> calls backend REST APIs via Axios
backend (Express)
  -> applies auth + role middleware
  -> reads/writes MongoDB via Mongoose
```

## Roles and Behavior

### Student
1. View approved events.
2. Search and filter events.
3. Bookmark approved events.
4. Register/cancel registration for approved events.

### College
1. Create events.
2. Update/delete own events.
3. Newly created or updated events go to `pending` for admin review.
4. College can still view its own pending/rejected submissions.

### Admin
1. View moderation queue (`pending` events).
2. Approve or reject college submissions.
3. Rejected events become unavailable to students.

## Event Verification Flow

1. College submits event.
2. Event status = `pending`.
3. Admin approves or rejects.
4. Only `approved` events are visible/interactive for students.

## Routes (Frontend)

1. `/` landing page.
2. `/login` login page.
3. `/signup` signup page.
4. `/dashboard` authenticated dashboard.
5. `/event/:id` event details.
6. `/create-event` college-only event form.
7. `/bookmarks` student-only bookmarks.
8. `/admin/moderation` admin-only moderation panel.

## API Endpoints (Backend)

Base URL: `http://localhost:5000/api`

### Auth
1. `POST /auth/signup` create user account (`student` or `college` only).
2. `POST /auth/login` login.

### Events
1. `GET /events` event list with role-aware visibility.
2. `GET /events/:id` event details with role-aware visibility.
3. `POST /events` college creates event (`pending`).
4. `PUT /events/:id` college updates own event (`pending` again).
5. `DELETE /events/:id` college deletes own event.
6. `GET /events/user/events` college gets own events.
7. `GET /events/registered` student gets registered events.
8. `POST /events/:id/register` student registers (approved only).
9. `DELETE /events/:id/register` student cancels registration.

### Bookmarks
1. `GET /bookmarks` student bookmarks.
2. `POST /bookmarks/:eventId` student toggle bookmark (approved only).
3. `DELETE /bookmarks/:eventId` student remove bookmark.

### Admin Moderation
1. `GET /admin/events/pending` admin pending queue.
2. `GET /admin/events?status=pending|approved|rejected` admin event list by state.
3. `PATCH /admin/events/:id/status` admin approve/reject.

## Demo Credentials

1. Student
   - Email: `student@example.com`
   - Password: `password123`
2. College
   - Email: `college@example.com`
   - Password: `password123`
3. Admin
   - Email: `admin@example.com`
   - Password: `password123`

Note: admin signup is intentionally blocked from public signup.

## Setup Instructions

### Prerequisites
1. Node.js 18+ recommended.
2. MongoDB URI (Atlas or local).

### 1) Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

Notes:
1. `npm run dev` runs a pre-script (`scripts/free-port.js`) that frees port 5000 before nodemon starts.
2. Seed users/events are created if missing.

### 2) Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

Run frontend:

```bash
npm start
```

Open:
1. `http://localhost:3000/` (landing page)
2. Then login/signup.

## Project Structure

```text
CampusSphere/
  backend/
    config/
    data/
    middleware/
    models/
    routes/
    scripts/
    server.js
  frontend/
    public/
    src/
      api/
      components/
      context/
      hooks/
      pages/
      styles/
      App.js
```

## Key Implementation Notes

1. Frontend is API-driven (no mock event source).
2. Auth token is stored in localStorage and attached via Axios default header.
3. Protected routes enforce login and role checks on frontend.
4. Backend enforces role checks server-side for security.
5. Event moderation status is persisted on event documents.

## Requirement Check

### Implemented
1. Centralized event platform.
2. Three-role model (`admin`, `college`, `student`).
3. Verification/moderation path (`college -> admin -> student visibility`).
4. Bookmark + registration tracking.
5. Role-based route protection.
6. Responsive and themed UI with reusable components (`Navbar`, `EventCard`, `ProtectedRoute`).

### Not in scope yet (future enhancement)
1. Live socket push updates (current behavior is API refresh-based).
2. Advanced analytics and AI recommendation features.
3. Automated test suite.

## Troubleshooting

1. `Port 5000 is already in use`:
   - Backend `npm run dev` already attempts to free it automatically.
2. `MongoDB connection failed`:
   - Verify `MONGODB_URI` in `backend/.env`.
3. `401/403 from API`:
   - Re-login and confirm correct role for the route/action.
4. Admin login fails:
   - Ensure seed ran successfully and user exists in DB.

## Scripts

### Backend
1. `npm run dev` -> free port + nodemon server.
2. `npm start` -> node server.

### Frontend
1. `npm start` -> react dev server.
2. `npm run build` -> production build.

## License

Educational / assessment project.
