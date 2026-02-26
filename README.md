# 🚀 Jobify

Jobify is a modern full-stack job platform built to simulate a real SaaS product. It allows companies to publish job opportunities and candidates to browse and apply.

This project was designed with professional architecture, clean UI principles, and scalable backend integration in mind.

---

# 🧠 Project Goal

The purpose of Jobify is to demonstrate:

* Clean frontend architecture
* Role-based authentication
* Modern UI/UX principles
* State management with Redux
* Scalable backend-ready structure
* Enterprise-ready folder organization

This is a portfolio-level project built to reflect production-level standards.

---

# 🏗️ Architecture Overview

```
Jobify/
 ├── jobify-frontend/
 └── jobify-backend/
```

Frontend and backend are separated for professional structure and scalability.

---

# 🎨 Frontend Stack

### Core

* React (Vite)
* TypeScript
* Redux Toolkit
* React Router v6

### UI & Styling

* TailwindCSS
* shadcn/ui
* Lucide Icons
* Framer Motion (animations)
* Sonner (toast notifications)

### Architecture Features

* Sidebar SaaS layout
* Role-based UI (Candidate / Company)
* Protected routes
* LocalStorage persistence
* Skeleton loading states
* Empty states
* Command palette (⌘K)
* Dark mode ready
* Animated components

---

# 🖥️ Backend Stack (Planned / In Progress)

* Java 17
* Spring Boot
* Spring Web
* Spring Data JPA
* Spring Security
* JWT Authentication
* PostgreSQL
* Flyway (database migrations)

Backend will follow clean layered architecture:

```
controller
service
repository
entity
DTO
security
config
```

---

# 🗄️ Database

PostgreSQL is used as the primary relational database.

Entities:

* User (Candidate / Company)
* Job
* Application

Relationships:

* One Company → Many Jobs
* One Candidate → Many Applications
* One Job → Many Applications

---

# 🔐 Authentication

Frontend currently uses mocked authentication with Redux.

Backend will implement:

* JWT-based authentication
* Role-based authorization
* Secure password storage

---

# 📦 Features Implemented (Frontend)

* User login with role selection
* Dashboard with job listing
* Job creation (Company role)
* Protected routes
* Toast notifications
* Smooth animations
* Professional monochromatic UI

---

# 🚀 Running the Frontend

```bash
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🔧 Running the Backend (Planned)

```bash
./mvnw spring-boot:run
```

Backend will run at:

```
http://localhost:8080
```

---

# 🎯 Professional Highlights

* Enterprise UI design
* Clean folder structure
* Modern state management
* Backend-ready architecture
* CI-ready repository
* Scalable codebase

---

# 📌 Future Improvements

* Real backend integration
* JWT authentication
* Database persistence
* File uploads (resume)
* Pagination & filtering
* Admin dashboard
* Docker containerization

---

# 📄 License

This project is for educational and portfolio purposes.
