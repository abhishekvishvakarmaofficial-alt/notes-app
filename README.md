# 📝 Simple Notes App

A full-stack, production-ready Notes application built with **React**, **Node.js/Express**, **MongoDB**, **Tailwind CSS**, and **Docker**.

---

## ✨ Features

- **CRUD Operations** — Create, Read, Update, Delete notes
- **Live Search** — Debounced search across title and content
- **Pagination** — Server-side with configurable page size
- **Dark Mode** — System-aware with manual toggle, persisted in localStorage
- **Toast Notifications** — Instant feedback on every action
- **Responsive UI** — Mobile-first, works great on all screen sizes
- **Loading & Empty States** — Polished UX for every scenario
- **Security** — Helmet, rate limiting, input sanitization, CORS
- **Validation** — Client-side + server-side with detailed error messages
- **Docker Ready** — Full multi-container setup with one command

---

## 🛠️ Tech Stack

| Layer      | Technology                         |
|------------|-------------------------------------|
| Frontend   | React 18, React Router v6, Tailwind CSS, Axios |
| Backend    | Node.js, Express.js, MVC pattern   |
| Database   | MongoDB 7, Mongoose ODM            |
| DevOps     | Docker, Docker Compose, Nginx      |
| Security   | Helmet, express-rate-limit, mongo-sanitize |

---

## 📁 Folder Structure

```
simple-notes-app/
│
├── frontend/
│   ├── public/                   # Static assets, index.html
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── EmptyState.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── NoteCard.jsx
│   │   │   ├── NoteForm.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── context/
│   │   │   └── DarkModeContext.jsx
│   │   ├── hooks/
│   │   │   └── useNotes.js       # Custom hook for note operations
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── CreateNotePage.jsx
│   │   │   ├── EditNotePage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── services/
│   │   │   └── noteService.js    # Axios API layer
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   └── noteController.js     # CRUD handlers
│   ├── middleware/
│   │   ├── errorMiddleware.js    # Global error handler
│   │   └── validationMiddleware.js
│   ├── models/
│   │   └── noteModel.js          # Mongoose schema
│   ├── routes/
│   │   └── noteRoutes.js
│   ├── server.js                 # Express app entry point
│   ├── Dockerfile
│   └── package.json
│
├── .env                          # Environment variables
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory (already included):

```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/notesdb
NODE_ENV=development
CLIENT_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

---

## 🚀 Getting Started

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- OR: Node.js v20+, npm v10+, MongoDB

---

### 🐳 Docker Setup (Recommended)

```bash
# 1. Clone / navigate to project directory
cd simple-notes-app

# 2. Start all services
docker compose up --build

# App is now running at:
# Frontend → http://localhost:3000
# Backend  → http://localhost:5000
# MongoDB  → localhost:27017
```

---

### 💻 Local Development (Without Docker)

#### Backend

```bash
cd backend
npm install

# Make sure MongoDB is running locally, then:
# Edit .env: MONGO_URI=mongodb://localhost:27017/notesdb
npm run dev   # starts on http://localhost:5000
```

#### Frontend

```bash
cd frontend
npm install

# Edit src/services/noteService.js if needed:
# REACT_APP_API_URL=http://localhost:5000/api
npm start     # starts on http://localhost:3000
```

---

## 🐳 Docker Commands Reference

```bash
# ── Build & Run ──────────────────────────────────────────────────────────
# Build and start all containers
docker compose up --build

# Start in detached (background) mode
docker compose up -d --build

# ── Individual Services ───────────────────────────────────────────────────
# Build frontend image only
docker build -t notes-frontend ./frontend

# Build backend image only
docker build -t notes-backend ./backend

# Run frontend container manually
docker run -p 3000:80 notes-frontend

# Run backend container manually
docker run -p 5000:5000 --env-file .env notes-backend

# Run MongoDB container manually
docker run -d -p 27017:27017 -v mongo-data:/data/db --name notes-mongo mongo:7.0

# ── Management ────────────────────────────────────────────────────────────
# Stop all containers
docker compose down

# Stop and remove volumes (clears database)
docker compose down -v

# View logs (all services)
docker compose logs -f

# View logs for specific service
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongo

# Restart a specific service
docker compose restart backend

# ── Cleanup ───────────────────────────────────────────────────────────────
# Remove containers, networks, and volumes
docker compose down -v --remove-orphans

# Remove all unused images
docker image prune -f
```

---

## 📡 API Endpoints

| Method | Endpoint          | Description                          |
|--------|-------------------|--------------------------------------|
| GET    | `/api/health`     | Health check                         |
| GET    | `/api/notes`      | Get all notes (supports `page`, `limit`, `search`) |
| GET    | `/api/notes/:id`  | Get a single note                    |
| POST   | `/api/notes`      | Create a new note                    |
| PUT    | `/api/notes/:id`  | Update a note                        |
| DELETE | `/api/notes/:id`  | Delete a note                        |

### Query Parameters (GET /api/notes)

| Param    | Default | Description              |
|----------|---------|--------------------------|
| `page`   | `1`     | Page number              |
| `limit`  | `9`     | Notes per page (max 50)  |
| `search` | `""`    | Search title and content |

### Example Requests

```bash
# Get notes
curl http://localhost:5000/api/notes?page=1&limit=9

# Search notes
curl http://localhost:5000/api/notes?search=meeting

# Create note
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"My Note","content":"Hello world"}'

# Update note
curl -X PUT http://localhost:5000/api/notes/<id> \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title","content":"New content"}'

# Delete note
curl -X DELETE http://localhost:5000/api/notes/<id>
```

---

## 📸 Screenshots

> Add screenshots of your running app here:
>
> - `screenshots/home-light.png`
> - `screenshots/home-dark.png`
> - `screenshots/create-note.png`
> - `screenshots/edit-note.png`

---

## 🔮 Future Improvements

- [ ] User authentication (JWT)
- [ ] Note categories / tags
- [ ] Rich text / Markdown editor
- [ ] Note sharing / collaboration
- [ ] File attachments
- [ ] Export notes to PDF
- [ ] Drag-and-drop reordering
- [ ] Full-text search with MongoDB Atlas Search
- [ ] Redis caching layer
- [ ] CI/CD pipeline with GitHub Actions

---

## 📄 License

MIT License — feel free to use this project as a starter template.
#