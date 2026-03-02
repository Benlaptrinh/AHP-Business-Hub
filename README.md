# AHP Business Hub

AHP Business Hub is a fullstack platform for enterprise operations, combining a public-facing website with an internal admin dashboard.

## Overview

This repository contains two applications:
- `Frontend/`: Next.js + TypeScript application for public pages and admin UI.
- `Backend/`: NestJS + TypeScript API for authentication, authorization, and business modules.

## Core Capabilities

- Public website and admin dashboard in one unified platform.
- Role-based access control (RBAC) for admin modules.
- JWT authentication with Google OAuth integration.
- RESTful APIs with standardized response structure.
- MySQL-backed domain model for projects, jobs, and payments.
- CI pipeline with automated build validation.
- Docker-based local infrastructure for consistent development.

## Repository Structure

```text
.
├── Frontend/                 # Next.js application
├── Backend/                  # NestJS API service
├── .github/workflows/        # CI workflows
├── docs/                     # Project documentation
├── docker-compose.yml        # Local MySQL service
├── CONTRIBUTING.md           # Contribution guidelines
└── README.md
```

## Architecture

```text
Frontend (Next.js)
  -> Calls REST APIs
Backend (NestJS)
  -> Auth (JWT/OAuth), RBAC, Business Modules
MySQL
  -> Persistent data layer
Third-party services
  -> Google OAuth, Cloudinary, PayPal, SMTP
```

## Tech Stack

- Frontend: Next.js, React, TypeScript, TailwindCSS
- Backend: NestJS, TypeScript, class-validator, JWT
- Database: MySQL
- Auth: JWT, Google OAuth
- DevOps: Docker, GitHub Actions

## Quick Start

### 1. Prerequisites

- Node.js 18+
- npm 9+
- Docker (optional, for local MySQL)

### 2. Clone and install

```bash
git clone https://github.com/Benlaptrinh/AHP-Business-Hub.git
cd AHP-Business-Hub

cd Frontend && npm install
cd ../Backend && npm install
cd ..
```

### 3. Configure environment variables

```bash
cp Frontend/.env.example Frontend/.env.local
cp Backend/.env.example Backend/.env
```

### 4. Run local database (optional)

```bash
docker compose up -d
```

### 5. Start backend and frontend

```bash
# Terminal 1
cd Backend
npm run start:dev

# Terminal 2
cd Frontend
npm run dev
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`

## Common Scripts

### Frontend (`Frontend/`)

- `npm run dev`: start development server
- `npm run build`: build production bundle
- `npm run start`: run production server
- `npm run lint`: run lint checks

### Backend (`Backend/`)

- `npm run start:dev`: start API in watch mode
- `npm run build`: compile NestJS project
- `npm run test`: run unit tests
- `npm run test:e2e`: run end-to-end tests
- `npm run lint`: run lint checks

## CI

GitHub Actions workflow runs automated builds for both `Frontend` and `Backend` on push and pull request to `main`.

## Documentation

Detailed docs are available in `docs/`:
- Setup guides
- API conventions
- RBAC matrix
- Docker workflow
- Testing strategy
- Deployment checklist

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.

## Security

For vulnerability reports, please follow [SECURITY.md](./SECURITY.md) and report issues privately.

## License

This project is currently for internal/portfolio use.
