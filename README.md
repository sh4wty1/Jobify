# Jobify

Jobify is a full-stack web application for job posting and job applications.

⚠️ This project is currently under active development.

## 🚀 Tech Stack

### Frontend
- React
- TypeScript
- Redux Toolkit
- TailwindCSS
- Axios

### Backend
- Java
- Spring Boot
- Spring Security (JWT Authentication)
- PostgreSQL
- JPA / Hibernate

---

## 📌 Current Features

- User registration and login (JWT authentication)
- Role-based access (COMPANY / USER)
- Companies can create job postings
- Public job listing
- Protected routes based on role

---

## 🛠️ Project Structure


jobify-backend/
jobify-frontend/


- `jobify-backend` → Spring Boot API
- `jobify-frontend` → React + TypeScript client

---

## 🔐 Authentication

Authentication is handled using JWT tokens.

- Login returns a JWT token
- Protected routes require Authorization header
- Role-based authorization is enforced on the backend

---

## 🧪 Status

This project is still in development.  
New features, improvements, and refactoring are ongoing.

Planned features include:
- User profile page
- CV (PDF) upload
- Job applications system
- Dashboard improvements
- Better error handling
- UI refinements

---

## 📦 How to Run

### Backend
```
cd jobify-backend
./mvnw spring-boot:run
```
Runs on:
`http://localhost:8080`

###Frontend
```
cd jobify-frontend
npm install
npm run dev
```
Runs on:
`http://localhost:3000`

##📄 License

This project is for educational and portfolio purposes.
