# ip-geo-api

NestJS REST API for the IP Geo JLabs Basic Assessment Exam. Handles user authentication with JWT and persists IP search history in a MySQL database.

## Tech Stack

- NestJS 11
- TypeORM 0.3
- MySQL (via mysql2)
- JWT Authentication (passport-jwt)
- bcryptjs
- class-validator / class-transformer

## Requirements

- Node.js v18+ (developed and tested on v20.17.0)
- MySQL running locally (XAMPP recommended, or standalone MySQL)

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=ip_geo_db
JWT_SECRET=your_strong_secret_key_here
FRONTEND_URL=http://localhost:5173
```

| Variable       | Description                                              |
|----------------|----------------------------------------------------------|
| `DB_HOST`      | MySQL host (usually `localhost`)                         |
| `DB_PORT`      | MySQL port (default `3306`)                              |
| `DB_USERNAME`  | MySQL username (default `root` for XAMPP)                |
| `DB_PASSWORD`  | MySQL password (leave empty if none set in XAMPP)        |
| `DB_DATABASE`  | Name of the database to use                              |
| `JWT_SECRET`   | Any long random string used to sign JWT tokens           |
| `FRONTEND_URL` | URL of the frontend (for CORS) — default `http://localhost:5173` |

### 3. Create the database

Start MySQL (via XAMPP Control Panel or your MySQL service), then open phpMyAdmin at http://localhost/phpmyadmin and create a new database named `ip_geo_db`.

> **Note:** TypeORM runs with `synchronize: true` in development — it will automatically create the `users` and `search_histories` tables on first start. You do **not** need to run any migrations.

### 4. Run the seeder

```bash
npm run seed
```

This creates a default test user:

| Field    | Value              |
|----------|--------------------|
| Email    | john@example.com   |
| Password | password123        |

If the user already exists, the seeder skips silently.

### 5. Start the server

```bash
npm run start:dev
```

The API will be running at: **http://localhost:8000**

---

## API Endpoints

### Authentication

#### `POST /api/login`

Authenticates a user and returns a JWT token.

**Request body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response `200 OK`:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "john@example.com"
  }
}
```

**Response `401 Unauthorized`** (wrong credentials):
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

---

### Search History

All history endpoints require a valid JWT token in the `Authorization` header:

```
Authorization: Bearer <access_token>
```

---

#### `GET /api/history`

Returns all saved IP searches for the authenticated user, ordered by most recent first.

**Response `200 OK`:**
```json
[
  {
    "id": 3,
    "ip": "8.8.8.8",
    "data": {
      "ip": "8.8.8.8",
      "city": "Mountain View",
      "region": "California",
      "country": "US",
      "loc": "37.3861,-122.0840",
      "org": "AS15169 Google LLC",
      "timezone": "America/Los_Angeles"
    },
    "userId": 1,
    "createdAt": "2026-03-19T10:00:00.000Z"
  }
]
```

**Response `401 Unauthorized`** — missing or expired token.

---

#### `POST /api/history`

Saves a new IP search entry for the authenticated user.

**Request body:**
```json
{
  "ip": "8.8.8.8",
  "data": {
    "ip": "8.8.8.8",
    "city": "Mountain View",
    "region": "California",
    "country": "US",
    "loc": "37.3861,-122.0840",
    "org": "AS15169 Google LLC",
    "timezone": "America/Los_Angeles"
  }
}
```

**Response `201 Created`:**
```json
{
  "id": 3,
  "ip": "8.8.8.8",
  "data": { ... },
  "userId": 1,
  "createdAt": "2026-03-19T10:00:00.000Z"
}
```

---

#### `DELETE /api/history`

Deletes one or more history entries by ID. Only deletes entries belonging to the authenticated user.

**Request body:**
```json
{
  "ids": [1, 2, 3]
}
```

**Response `200 OK`:**
```json
{
  "deleted": 3
}
```

---

## Troubleshooting

**`Error: JWT_SECRET environment variable is not set`**
→ Make sure your `.env` file exists in the project root and contains `JWT_SECRET`.

**`connect ECONNREFUSED 127.0.0.1:3306`**
→ MySQL is not running. Start it via XAMPP Control Panel or your MySQL service.

**`Unknown database 'ip_geo_db'`**
→ Create the database in phpMyAdmin first (step 3 above).

**`Access denied for user 'root'@'localhost'`**
→ Check `DB_USERNAME` and `DB_PASSWORD` in your `.env` match your MySQL credentials.

**Port 8000 already in use**
→ Stop the other process using port 8000, or change the port in `src/main.ts`.
