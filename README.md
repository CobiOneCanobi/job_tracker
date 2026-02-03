# Job Application Tracker API

Backend API for job search management. Track applications across companies, log interview details, set automated reminders for follow-ups, and monitor application status from initial application through offer/rejection.

**Built to solve**: The chaos of tracking dozens of job applications across disconnected spreadsheets and notes.

**🚀 [Live Demo](https://job-tracker-api-cjxa.onrender.com/api-docs)** • **Demo Login:** `demo@example.com` / `password123`

---

## Status

✅ **Authentication System** - JWT-based auth with session management complete
✅ **Database Schema** - Fully designed and implemented
🚧 **Core APIs** - CRUD endpoints for companies, applications, interviews in progress

---

## Tech Stack

- **Backend**: Node.js 20 + Express + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: JWT + bcrypt password hashing
- **Validation**: Zod schemas
- **Documentation**: OpenAPI 3.0 / Swagger UI
- **Deployment**: Docker multi-stage builds

---

## Features

- ✅ **User Authentication** - Secure JWT-based auth with session invalidation on logout
- 🚧 **Company Tracking** - Manage companies of interest with notes and website links
- 🚧 **Application Pipeline** - Track status from Saved → Applied → Interviewing → Offer/Rejected
- 🚧 **Interview Logging** - Record phone screens, technical, behavioral, onsite, and final interviews
- 🚧 **Smart Reminders** - Automated follow-up notifications with delivery tracking
- 🚧 **Search & Filters** - Query by status, company, date range

---

## Setup

**Prerequisites:** Node.js 20+

### Development Setup

#### Option 1: With Docker (Recommended)

Run PostgreSQL in Docker, app runs locally:

```bash
# 1. Start PostgreSQL
docker-compose up -d

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# (Defaults work with docker-compose)

# 4. Run migrations
npx prisma migrate dev

# 5. (Optional) Seed demo data
npm run seed

# 6. Start development server
npm run dev
```

#### Option 2: Without Docker

Run everything locally (requires PostgreSQL installed):

```bash
# 1. Install dependencies
npm install

# 2. Create and configure .env
cp .env.example .env
# Edit DATABASE_URL to match your local PostgreSQL:
# DATABASE_URL="postgresql://your_user:your_password@localhost:5432/job_tracker"

# 3. Create database
createdb job_tracker

# 4. Run migrations
npx prisma migrate dev

# 5. (Optional) Seed demo data
npm run seed

# 6. Start development server
npm run dev
```

Your app runs at `http://localhost:3000` with hot reload enabled.

**Available scripts:**

- `npm run dev` - Development server with hot reload (tsx)
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production build (compiled code)
- `npm run seed` - Seed database with demo data
- `npm run lint` - Check for linting errors
- `npm run lint:fix` - Auto-fix linting errors

---



## API Documentation

**Live API**: <https://job-tracker-api-cjxa.onrender.com/api-docs>

**Local**: `http://localhost:3000/api-docs` (when running locally)

Interactive Swagger UI documentation with request/response examples and the ability to test endpoints directly.

---

## Demo Data

Seed the database with realistic demo data:

```bash
npm run seed
```

**Demo credentials:**

- Email: `demo@example.com`
- Password: `password123`

The seed script can be run multiple times - it will refresh the demo data each time.

Login via the `/login` endpoint, copy the returned JWT token, and use the "Authorize" button in Swagger UI to test authenticated endpoints.

---

## Technical Architecture

### Database Schema

Fully normalized relational schema with 5 core models:

- **Users** - Authentication and account management
- **Companies** - Organizations being tracked by users
- **Applications** - Job applications with status pipeline (Saved → Applied → Phone Screen → Mid Process → Offer/Rejected/Withdrawn)
- **Interviews** - Scheduled and completed interviews with types (Phone, Technical, Behavioral, Onsite, Final)
- **Reminders** - User-defined follow-up notifications with delivery tracking (Pending/Sent/Cancelled)

**Key Design Decisions:**

- Cascading deletes maintain referential integrity across relations
- Compound indexes on `(userId, status)` enable fast filtered queries
- Enum types for application status and interview types ensure data consistency
- Separate `sessionId` field on User enables instant JWT revocation on logout

View full schema: [prisma/schema.prisma](prisma/schema.prisma)

### Authentication Flow

**JWT + Database Session Pattern:**

1. User logs in → JWT issued with `{ userId, sessionId }` payload
2. `sessionId` stored in database on User record
3. `ensureAuthenticated` middleware validates JWT signature AND checks `sessionId` matches database
4. Logout sets `sessionId` to `null` → token immediately invalidated

**Why this approach:** Prevents token reuse after logout without maintaining a separate token blacklist. Tokens are stateless but sessions are revocable.

### Code Architecture Patterns

**Layered Structure:**

```text
Routes → Controllers → Services → Prisma
```

**Error Handling:**

- Service layer maps domain-specific errors (e.g., Prisma `P2002` → `"Email already exists"`)
- Controller layer catches errors, logs with context, returns appropriate HTTP status codes
- Services throw meaningful errors OR propagate originals—never empty `throw new Error()`

**Validation Strategy:**

- Zod schemas at API boundary validate incoming requests
- TypeScript types generated from Prisma models ensure compile-time type safety
- No validation bypasses between layers

**Key Implementation Files:**

- [authController.ts](src/controllers/authController.ts) - Request handlers with OpenAPI documentation
- [authService.ts](src/services/authService.ts) - Business logic and database operations
- [auth.ts](src/middleware/auth.ts) - JWT verification middleware
- [schemas.ts](src/swagger/schemas.ts) - OpenAPI component definitions

---

## Production Deployment

Build and run the optimized multi-stage Docker image:

```bash
docker build -t job-tracker .
docker run -p 3000:3000 --env-file .env job-tracker
```

Or compile and run directly:

```bash
npm run build  # Compiles TypeScript to dist/
npm start      # Runs compiled JavaScript
```


---
