# Job Application Tracker API

Backend API for job search management. Track applications across companies, log interview details, set automated reminders for follow-ups, and monitor application status from initial application through offer/rejection.

---

## Tech Stack

- Node.js 20 + Express + TypeScript
- PostgreSQL + Prisma ORM

---

## Setup

**Prerequisites:** Node.js 22+

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

# 5. Start development server
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

# 5. Start development server
npm run dev
```

Your app runs at `http://localhost:3000` with hot reload enabled.

**Available scripts:**

- `npm run dev` - Development server with hot reload (tsx)
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production build (compiled code)
- `npm run lint` - Check for linting errors
- `npm run lint:fix` - Auto-fix linting errors

### Production Deployment

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

## API Documentation

Once running, visit: `http://localhost:3000/api/docs`

Interactive API documentation with request/response examples and the ability to test endpoints directly.

