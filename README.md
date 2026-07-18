# MBD Solutions — Enterprise Software Company Platform

Production-ready platform for **MBD Solutions (Mon Bai Dhakad Solutions)** — websites, ERP systems, mobile apps, AI solutions, and digital marketing.

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 15 App Router, React 19, TypeScript |
| UI | Tailwind CSS, Shadcn-style components, Framer Motion, Three.js |
| Database | Neon PostgreSQL + Prisma ORM |
| Auth | JWT + Refresh Tokens + RBAC |
| Media | Cloudinary |
| Deploy | **Single Vercel project only** |

Everything runs inside **one Next.js application**. There is no separate NestJS, Express, Render, Railway, Docker, or VPS backend.

## Project Structure

```
apps/web                 Next.js public site + admin + API route handlers
apps/web/prisma          Prisma schema + seed data
apps/web/src/app/api     Auth, CRUD, media, analytics, search
apps/web/src/lib         Database, auth, queries, CRUD helpers
```

## Quick Start

### 1. Prerequisites

- Node.js 20+
- Neon PostgreSQL database (or any PostgreSQL URL)

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Copy `.env.example` to `.env` in the **repository root** and also to `apps/web/.env`:

```bash
copy .env.example .env
copy .env.example apps\web\.env
```

Set at minimum:

- `DATABASE_URL` — Neon connection string
- `JWT_SECRET` / `JWT_REFRESH_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- Cloudinary keys (optional; uploads fall back to inline storage)

### 4. Database setup

```bash
npm run db:setup
```

This generates the Prisma client, pushes the schema, and seeds real MBD Solutions content.

### 5. Run development server

```bash
npm run dev
```

- Website: http://localhost:3000
- Admin: http://localhost:3000/admin/login
- API: http://localhost:3000/api

### Admin access

Sign in at `/admin/login`. Authentication is handled entirely on the server:

- Passwords are bcrypt-hashed in the database (never stored in plain text)
- Sessions use **HttpOnly cookies** (not localStorage)
- JWT secrets and admin seed credentials live in **server-only** `.env` variables (never `NEXT_PUBLIC_`)
- Login is rate-limited (5 attempts per 15 minutes per IP)
- All `/admin/*` routes are protected by middleware

## Admin Dashboard

Manage without code changes:

- Homepage sections, Services, Products, Portfolio
- Blogs, Categories, Team, Founder
- Careers, Job Applications
- Testimonials, FAQs, Technologies, Industries
- SEO, Contact messages, Newsletter
- Website settings, Media library
- Users, Roles & permissions, Audit logs
- Analytics dashboard

## Public Pages

Home, Services, Products, Solutions, Portfolio, Case Studies, Industries, Technologies, Pricing, About, Founder, Leadership, Team, Careers, Internship, Blog, Testimonials, FAQs, Documentation, Resources, Contact, Privacy, Terms, Cookies, Search, 404.

## Live Product Demos

Served from `/demos`:

- DoctorCare Pro
- FitZone Gym
- FoodHub Restaurant

## Deployment (Vercel only)

1. Push this repository to GitHub.
2. Import into Vercel.
3. Set **Root Directory** to `apps/web`.
4. Add environment variables from `.env.example`.
5. Deploy.

Build command (default from `apps/web/package.json`):

```bash
prisma generate && next build
```

No additional hosting is required. Neon handles PostgreSQL. Cloudinary handles media. Vercel runs the full Next.js app including `/api` route handlers.

## Architecture Notes

- Public pages use **Server Components** and Prisma directly (cached).
- Admin and forms use **Route Handlers** under `/app/api`.
- Authentication uses **JWT access tokens** (15m) and **refresh tokens** (7d).
- Roles: `SUPER_ADMIN`, `ADMIN`, `EDITOR`, `CLIENT`, `USER`.
