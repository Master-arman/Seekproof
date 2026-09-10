# SeekProof - Premier Private Investigation & Intelligence Platform

SeekProof is a full-stack platform engineered for professional private investigation agencies, corporate intelligence operations, digital forensics, and client case tracking.

---

## 🛠️ Technology Stack

### Frontend (`/client`)
- **Framework:** React (Vite) + TypeScript
- **Routing:** React Router v6
- **Styling:** Tailwind CSS + Custom Dark Investigation Design System
- **UI Components:** shadcn/ui architecture (Radix UI primitives & custom utility components)
- **Icons & Motion:** Lucide React & Framer Motion
- **Form Management:** React Hook Form + Zod Schema Validation
- **HTTP Client:** Axios with dynamic auth interceptors

### Backend (`/server`)
- **Runtime & Framework:** Node.js + Express + TypeScript
- **Database:** MySQL (using `mysql2/promise` connection pooling)
- **Authentication & Security:** JWT (JSON Web Tokens), bcryptjs password hashing, Helmet headers, CORS policy, Express Rate Limiting
- **Validation:** Zod schema validation middleware
- **Environment Management:** dotenv

---

## 📁 Project Structure

```
SeekProof/
├── client/                     # Frontend Application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/             # Brand logos, icons, imagery
│   │   ├── components/         # Reusable UI & shadcn/ui components
│   │   │   ├── common/         # Navbar, Footer, Emergency Hotline Banner
│   │   │   └── ui/             # Button, Card, Badge, Input, Textarea, Dialog, Tabs, etc.
│   │   ├── hooks/              # Custom React hooks (useAuth, etc.)
│   │   ├── layouts/            # MainLayout, AuthLayout, DashboardLayout
│   │   ├── lib/                # API client, utility functions, formatting
│   │   ├── pages/              # Home, Services, Case Studies, Contact, Login, Register, Dashboard
│   │   ├── services/           # Frontend API consumer services
│   │   ├── types/              # Client TypeScript models
│   │   ├── App.tsx             # Root routing and application providers
│   │   ├── index.css           # Global stylesheet with design system tokens
│   │   └── main.tsx            # Entry point
│   ├── .env.example            # Client environment template
│   ├── package.json
│   ├── tailwind.config.ts
│   └── vite.config.ts
│
├── server/                     # Backend API Server
│   ├── src/
│   │   ├── config/             # Config loader and database credentials
│   │   ├── controllers/        # Request handlers (auth, cases, inquiries)
│   │   ├── database/           # MySQL pool connection and connection tester
│   │   ├── middleware/         # JWT Auth, Zod validation, Rate limiter, Error handler
│   │   ├── migrations/         # SQL schema definitions & scripts
│   │   ├── routes/             # Express API endpoints
│   │   ├── services/           # Business logic execution
│   │   ├── types/              # Server-side TypeScript typings
│   │   ├── validators/         # Zod schemas for request payloads
│   │   ├── app.ts              # Express application configuration
│   │   └── server.ts           # Server bootstrap and port listener
│   ├── .env.example            # Server environment template
│   ├── package.json
│   └── tsconfig.json
│
├── package.json                # Monorepo command runner
└── README.md                   # Full documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** >= 18.x
- **npm** >= 9.x
- **MySQL** >= 8.0 (Optional for initial frontend dev; backend runs graceful health check if offline)

### 2. Environment Setup

#### Server Configuration
Navigate to `/server` and create `.env`:
```bash
cp server/.env.example server/.env
```
Default `.env` configuration:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=seekproof_db

# Security & Auth
JWT_SECRET=super_secret_jwt_key_investigation_seekproof_2026
JWT_EXPIRES_IN=7d
```

#### Client Configuration
Navigate to `/client` and create `.env`:
```bash
cp client/.env.example client/.env
```
Default `.env` configuration:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Install Dependencies
Run the install command from the root directory:
```bash
npm run install:all
```
*Or install independently:*
```bash
# Server
cd server && npm install

# Client
cd ../client && npm install
```

### 4. Database Setup & Migration
To apply the initial database schema (creates `users`, `cases`, `inquiries`, `evidence_files`, `activity_logs`):
```bash
npm run db:migrate
# or within /server:
cd server && npm run db:migrate
```

### 5. Running the Application

To start both **Client (Vite on :5173)** and **Server (Express on :5000)** concurrently:
```bash
npm run dev
```

Or run separately:
```bash
# Start backend API (http://localhost:5000)
npm run dev:server

# Start frontend UI (http://localhost:5173)
npm run dev:client
```

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/health` | Service & database health check | No |
| `POST` | `/api/auth/register` | Register new user / client account | No |
| `POST` | `/api/auth/login` | Authenticate and obtain JWT token | No |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | Bearer Token |
| `POST` | `/api/inquiries` | Submit confidential investigation consultation | No |
| `GET` | `/api/inquiries` | List all inquiries (Admin / Investigator) | Bearer Token (Admin) |
| `GET` | `/api/cases` | List user cases / all active cases | Bearer Token |
| `POST` | `/api/cases` | Open a new investigation case | Bearer Token |
| `GET` | `/api/cases/:id` | Get case details and evidence timeline | Bearer Token |

---

## 🔒 Security Best Practices Implemented
- **Helmet Headers:** Secures HTTP headers against standard vulnerabilities.
- **Express Rate Limiting:** Throttles brute-force attempts on sensitive endpoints.
- **Zod Request Validation:** Strictly validates all incoming body and query payloads.
- **Bcrypt Hashing:** All passwords salted and hashed with 12 salt rounds.
- **JWT Authorization:** Stateless token authentication with role-based access control (`client`, `investigator`, `admin`).
- **No Hardcoded Secrets:** Config strictly driven by `.env` configurations.

---

## 📄 License
Proprietary © SeekProof Intelligence & Investigation Agency. All rights reserved.
