# ip-geo-api

NestJS REST API for the IP Geo Lookup application. Handles user authentication with JWT.

## Tech Stack
- NestJS
- TypeORM
- MySQL
- JWT Authentication
- bcryptjs

## Requirements
- Node.js v18+
- MySQL running (XAMPP or standalone)

## Setup

### 1. Clone the repository
```bash
git clone https://github.com/SeesonLau/ip-geo-api.git
cd ip-geo-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=ip_geo_db
JWT_SECRET=your_jwt_secret_key
```

### 4. Create the database
Open phpMyAdmin at http://localhost/phpmyadmin and create a database named `ip_geo_db`.

### 5. Run the seeder
```bash
npm run seed
```
This creates a default user:
- **Email:** john@example.com
- **Password:** password123

### 6. Start the server
```bash
npm run start:dev
```
Server runs on http://localhost:8000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/login | Login with email and password |

### Login Request
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Login Response
```json
{
  "access_token": "eyJ...",
  "user": {
    "id": 1,
    "email": "john@example.com"
  }
}
```
