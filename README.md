# Firefighter Project Setup (XAMPP + React + PHP)

This project has:
- **Frontend**: React.js (Vite)
- **Backend**: PHP
- **Database**: MySQL (via XAMPP)

Follow these steps to run the project locally.

---

## 1) Prerequisites

Install these first:
- [XAMPP](https://www.apachefriends.org/)
- [Node.js + npm](https://nodejs.org/)
- Git

---

## 2) Place project in XAMPP `htdocs`

1. Open your XAMPP installation folder.
   - Example (Windows): `C:\xampp\htdocs`
2. Copy this project folder (`firefighter`) into `htdocs`.
3. Final path should look like:
   - `C:\xampp\htdocs\firefighter`

---

## 3) Database setup in phpMyAdmin

1. Start **Apache** and **MySQL** from XAMPP Control Panel.
2. Open phpMyAdmin:
   - `http://localhost/phpmyadmin`
3. Create a new database named:
   - `firefighter`
4. Select the `firefighter` database.
5. Click **Import**.
6. Import SQL file from repository:
   - `database/init.sql`

> Note: If your SQL import expects database name `fire-fighter`, either create that DB name instead, or update backend DB name in config.

---

## 4) Backend setup (PHP in XAMPP)

Backend folder path in project:
- `backend/`

Because Apache serves from `htdocs`, ensure project is accessible at:
- `http://localhost/firefighter/`

If you use DB name `firefighter`, update backend DB config:
- File: `backend/config/db.php`
- Set DB name to `firefighter`.

Example:
```php
$db = getenv("DB_NAME") ?: "firefighter";
```

---

## 5) Frontend setup (React + Vite)

Frontend folder path:
- `frontend/`

Run these commands:

```bash
cd frontend
npm i
npm run dev
```

- `npm i` installs all dependencies (node_modules are not included in repo).
- `npm run dev` starts Vite development server.

By default Vite runs on:
- `http://localhost:5173`

---

## 6) Connect frontend to backend

Make sure frontend env points to PHP backend base URL.

Example `.env` inside `frontend/`:
```env
VITE_API_BASE_URL=http://localhost/firefighter/backend/controllers
```

Then restart Vite dev server after changing `.env`.

---

## 7) Run project

1. Start XAMPP: **Apache + MySQL**
2. Start frontend:
   ```bash
   cd frontend
   npm run dev
   ```
3. Open app in browser:
   - Frontend: `http://localhost:5173`

---

## 8) Common issues

- **Database connection error**
  - Check DB name in `backend/config/db.php`.
  - Confirm MySQL is running in XAMPP.

- **API not reachable from frontend**
  - Check `VITE_API_BASE_URL` in `frontend/.env`.
  - Confirm backend path is correct under `htdocs/firefighter`.

- **CORS/session issues**
  - Ensure backend URLs and frontend URL match expected localhost ports/domains.

---

## 9) Quick command summary

```bash
# Frontend
cd frontend
npm i
npm run dev
```

XAMPP should keep Apache and MySQL running while you use the project.
