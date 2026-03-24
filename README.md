# URLite 2.0

A full-stack URL shortener built with Next.js, Prisma, PostgreSQL, and NextAuth.
Users can create short links instantly, authenticate with Google or email/password, and track click analytics for links they own.

## Live Project

https://urlite-2.vercel.app

## Highlights

- Shorten long URLs into compact, shareable links.
- Redirect flow with server-side click tracking.
- Authentication with Google OAuth (NextAuth) and credentials login (email/password + bcrypt).
- User-specific analytics dashboard with total URLs, total clicks, and per-link click counts.
- Input validation using Zod for URL and signup payloads.
- Toast-based UX feedback for API success/error states.
- Prisma ORM with relational models for users, links, sessions, and visit history.

## Tech Stack

- Frontend: Next.js (App Router), React, Tailwind CSS
- Backend: Next.js Route Handlers, NextAuth
- Database: PostgreSQL + Prisma
- Validation: Zod
- Auth Security: bcryptjs password hashing
- Deployment/Monitoring: Vercel, Vercel Analytics, Vercel Speed Insights

## Architecture Overview

1. User submits a long URL from the home page.
2. `POST /api/shorturl` validates input and stores `{ shortId, redirectUrl }`.
3. App returns a short URL like `https://domain/<shortId>`.
4. Visiting `/<shortId>` finds the URL record, stores a click event in `VisitHistory`, and redirects to the original URL.
5. Authenticated users can open `/analytics` to see their URL and click metrics.

## Core Routes

- `GET /` - URL shortener UI
- `GET /[shortId]` - redirect + visit logging
- `GET /analytics` - authenticated analytics page
- `POST /api/shorturl` - create short URL
- `GET /api/analytics` - fetch user analytics
- `POST /api/signup` - create user account
- `GET|POST /api/auth/[...nextauth]` - NextAuth handlers

## Database Models

- `User`
- `Url`
- `VisitHistory`
- `Account` (OAuth accounts)
- `Session`
- `VerificationToken`

## Local Setup

### 1) Clone and install

```bash
git clone <your-repo-url>
cd urlite
npm install
```

### 2) Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 3) Run Prisma migrations

```bash
npx prisma migrate dev
```

### 4) Start development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

- `npm run dev` - run local development server
- `npm run build` - generate Prisma client and build app
- `npm run start` - run production server
- `npm run lint` - run ESLint

## Project Structure

```txt
urlite/
  app/
    api/
    analytics/
    login/
    signup/
    [shortId]/
  components/
  lib/
    schema/
  prisma/
```

## Why This Project

URLite 2.0 demonstrates practical full-stack engineering:
- secure authentication and password handling
- validated API design
- relational data modeling
- analytics-driven product thinking
- production deployment on Vercel
