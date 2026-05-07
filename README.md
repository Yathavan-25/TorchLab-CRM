# Torch Lab CRM

A full-stack CRM Lead Management System built for small sales teams to track leads, manage pipelines, add notes, and view pipeline analytics.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), React, TypeScript |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Auth | JWT (JSON Web Tokens) |
| Styling | Taildwind CSS |

---

## Features

- JWT-based login and registration with protected routes
- Full lead CRUD — create, view, edit, and delete leads
- Lead fields: name, company, email, phone, source, salesperson, status, deal value
- Pipeline statuses: New, Contacted, Qualified, Proposal Sent, Won, Lost
- Internal notes per lead with author and timestamp
- Dashboard with total leads, pipeline breakdown, and deal value totals
- Search by name, company, or email
- Filter by status and lead source

---


## Running Locally

**Prerequisites:** Node.js v18+, MongoDB running locally or a MongoDB Atlas connection string.

**Backend**

Create a `.env` file inside the `backend/` directory:

```
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

Then from the `backend/` directory:

```
npm install
npm run dev
```

**Frontend**

From the `frontend/` directory:

```
npm install
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Test Credentials

| Field | Value |
|---|---|
| Email | admin@example.com |
| Password | password123 |

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login and receive JWT |
| GET | /api/leads | Get all leads |
| POST | /api/leads | Create a lead |
| GET | /api/leads/:id | Get a single lead |
| PUT | /api/leads/:id | Update a lead |
| DELETE | /api/leads/:id | Delete a lead |
| GET | /api/leads/dashboard | Get dashboard stats |
| GET | /api/notes/:leadId | Get notes for a lead |
| POST | /api/notes/:leadId | Add a note to a lead |

All routes except login and register require an `Authorization: Bearer <token>` header.

---

## Environment Variables

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key used to sign JWT tokens |
| `PORT` | Port for the Express server (default 5000) |

---

## Known Limitations

- No password reset flow
- Notes cannot be edited or deleted once added
- No role-based access control (all logged-in users share the same data)
- No pagination on the lead table for large datasets

---

## Reflection

This project was built to demonstrate full-stack fundamentals across auth, CRUD, database design, and UI. The stack was chosen for speed and familiarity — Next.js for the frontend with a clean App Router structure, Express for a lightweight REST API, and MongoDB for flexible document storage suited to a lead management schema.

The biggest challenge was structuring the dashboard aggregation query in MongoDB to compute won values and status breakdowns efficiently in a single request. The notes system was kept intentionally simple to stay within scope while still showing relational data patterns (notes linked to a lead by ID).

If extended, I would add pagination, salesperson filtering on the backend, email activity tracking, and a Kanban-style pipeline board view as a more visual alternative to the table.

---

## Demo Video

[Watch the demo](https://www.loom.com/share/e75130fa8dd0440dbef4de732837d213)
