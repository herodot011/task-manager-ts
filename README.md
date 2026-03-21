# Task Manager API (TypeScript)

## 📌 Description

REST API built with Node.js, Express, and TypeScript following a layered architecture (Controller → Service → Repository). Uses PostgreSQL with Prisma ORM and JWT authentication with role-based access control.

## 🏗 Architecture
```
Client → Routes → Middleware → Controllers → Services → Repositories → PostgreSQL
```

## ⚙️ Tech Stack

- Node.js + Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Bcrypt

## 📁 Project Structure
```
src/
├── controllers/
│   ├── authController.ts
│   └── taskController.ts
├── services/
│   ├── authService.ts
│   └── taskService.ts
├── repositories/
│   ├── userRepository.ts
│   └── taskRepository.ts
├── routes/
│   ├── auth.ts
│   └── tasks.ts
├── middlewares/
│   ├── auth.ts
│   ├── checkRole.ts
│   ├── errorHandler.ts
│   ├── logger.ts
│   └── notFound.ts
├── validators/
│   ├── authValidator.ts
│   └── taskValidator.ts
├── utils/
│   ├── AppError.ts
│   └── catchAsync.ts
├── config/
│   ├── db.ts
│   └── prisma.ts
└── app.ts
```

## 🚀 Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd task-manager-ts
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Run migrations:
```bash
npx prisma migrate dev
```

5. Start the server:
```bash
npm run dev
```

## 🛠 API Endpoints

### Auth
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | /auth/register | Register | No |
| POST | /auth/login | Login | No |

### Tasks
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | /tasks | Get all tasks | No |
| GET | /tasks/:id | Get task by ID | No |
| POST | /tasks | Create task | Yes |
| PATCH | /tasks/:id | Update task | Yes |
| DELETE | /tasks/:id | Delete task | Yes (admin) |

## ✨ Features

- Full CRUD for tasks
- JWT authentication
- Role-based access (user/admin)
- Pagination and filtering
- Centralized error handling
- Input validation
- Prisma ORM