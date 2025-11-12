# Moving Mountains - Alpine Digital

<img width="2034" height="1233" alt="Screenshot 2025-11-12 at 23 32 21" src="https://github.com/user-attachments/assets/b3cd3ffe-e6ee-43a5-919c-0a8a8871bb58" />


A full-stack application for managing and exploring mountain information. Built with Laravel (PHP) backend and Angular (TypeScript) frontend.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Backend Setup (Laravel)](#backend-setup-laravel)
- [Frontend Setup (Angular)](#frontend-setup-angular)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **PHP** >= 8.2
- **Composer** (PHP dependency manager)
- **Node.js** >= 18.x and **npm** (or **yarn**)
- **SQLite** (included with PHP, or install separately)
- **Git**

### Verify Installation

```bash
php --version        # Should be >= 8.2
composer --version   # Should be installed
node --version       # Should be >= 18.x
npm --version        # Should be installed
```

## Project Structure

```
Mountains/
├── backend/
│   └── moving_mountains/    # Laravel API backend
│       ├── app/
│       ├── config/
│       ├── database/
│       ├── routes/
│       └── storage/
├── frontend/
│   └── angular_moving_mountains/  # Angular frontend
│       ├── src/
│       └── public/
└── README.md
```

## Backend Setup (Laravel)

### 1. Navigate to Backend Directory

```bash
cd backend/moving_mountains
```

### 2. Install PHP Dependencies

```bash
composer install
```

### 3. Environment Configuration

Create a `.env` file from the example (if it doesn't exist):

```bash
cp .env.example .env
```

Or manually create a `.env` file with the following minimum configuration:

```env
APP_NAME="Moving Mountains"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/backend/moving_mountains/database/database.sqlite

SANCTUM_STATEFUL_DOMAINS=localhost,localhost:4200,127.0.0.1,127.0.0.1:8000

SESSION_DRIVER=cookie
SESSION_DOMAIN=localhost
```

### 4. Generate Application Key

```bash
php artisan key:generate
```

### 5. Create Database File

```bash
touch database/database.sqlite
```

Or ensure the file exists at `database/database.sqlite`.

### 6. Run Migrations

```bash
php artisan migrate
```

This will create the necessary database tables:
- `users`
- `mountains`
- `personal_access_tokens`
- `cache`
- `jobs`

### 7. (Optional) Seed Database

If you want to populate the database with sample data:

```bash
php artisan db:seed
```

### 8. Create Storage Link

Create a symbolic link for public storage:

```bash
php artisan storage:link
```

### 9. Set Permissions (Linux/Mac)

Ensure storage and cache directories are writable:

```bash
chmod -R 775 storage bootstrap/cache
```

## Frontend Setup (Angular)

### 1. Navigate to Frontend Directory

```bash
cd frontend/angular_moving_mountains
```

### 2. Install Node Dependencies

```bash
npm install
```

### 3. Environment Configuration

The frontend is configured to connect to the backend API at `http://localhost:8000/api` by default. This is set in:

```
src/environments/environments.ts
```

If your backend runs on a different port, update the `apiUrl` in this file.

## Running the Application

### Start Backend Server

From `backend/moving_mountains/`:

```bash
php artisan serve
```

The backend API will be available at: **http://localhost:8000**

### Start Frontend Development Server

From `frontend/angular_moving_mountains/`:

```bash
npm start
```

The frontend will be available at: **http://localhost:4200**

### Access the Application

1. Open your browser and navigate to: **http://localhost:4200**
2. You'll be redirected to the login page
3. Register a new account or login with existing credentials

## API Endpoints

All API endpoints require authentication via Laravel Sanctum (except registration and login).

### Authentication
- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Login user
- `POST /api/user/logout` - Logout user (requires auth)

### Mountains
- `GET /api/mountains/all` - Get all mountains (requires auth)
- `GET /api/mountains/get/{id}` - Get a specific mountain (requires auth)
- `POST /api/mountains/create` - Create a new mountain (requires auth)
- `PUT /api/mountains/edit/{id}` - Update a mountain (requires auth)
- `DELETE /api/mountains/delete/{id}` - Delete a mountain (requires auth)

## Features

- ✅ User authentication (Register, Login, Logout)
- ✅ Mountain CRUD operations
- ✅ Image upload and storage
- ✅ Responsive design
- ✅ Form validation
- ✅ Error handling
- ✅ Loading states
- ✅ Modern UI/UX

## Troubleshooting

### Backend Issues

**Problem: `composer install` fails**
- Solution: Ensure PHP >= 8.2 is installed and Composer is up to date

**Problem: `php artisan migrate` fails**
- Solution: Ensure `database/database.sqlite` exists and is writable

**Problem: Storage link fails**
- Solution: Run `php artisan storage:link` and ensure `public/storage` directory exists

**Problem: CORS errors**
- Solution: Check `config/sanctum.php` and ensure your frontend URL is in `stateful` domains

**Problem: 419 CSRF token mismatch**
- Solution: Clear browser cookies and ensure `SESSION_DOMAIN` in `.env` matches your domain

### Frontend Issues

**Problem: `npm install` fails**
- Solution: Clear npm cache: `npm cache clean --force` and try again

**Problem: Cannot connect to backend API**
- Solution: 
  1. Verify backend is running on port 8000
  2. Verify `src/environments/environments.ts` has correct API URL

**Problem: Authentication not working**
- Solution: 
  1. Check browser console for errors
  2. Verify backend Sanctum configuration
  3. Ensure cookies are enabled in browser

### Database Issues

**Problem: SQLite database locked**
- Solution: Ensure no other process is using the database file

**Problem: Migration errors**
- Solution: 
  1. Delete `database/database.sqlite`
  2. Run `php artisan migrate:fresh` (⚠️ This will delete all data)

## Development

### Backend Development

Run tests:
```bash
php artisan test
```

Clear cache:
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

### Frontend Development

Run linter:
```bash
npm run lint
```

Build for production:
```bash
npm run build
```

## Production Deployment

### Backend

1. Set `APP_ENV=production` and `APP_DEBUG=false` in `.env`
2. Run `php artisan config:cache`
3. Run `php artisan route:cache`
4. Ensure proper database configuration
5. Set up proper file permissions

### Frontend

1. Update `src/environments/environments.ts` with production API URL
2. Run `npm run build`
3. Deploy the `dist/` folder to your web server

## Technologies Used

### Backend
- Laravel 12
- Laravel Sanctum (Authentication)
- SQLite (Database)
- PHP 8.2+

### Frontend
- Angular 20
- TypeScript
- RxJS
- Tailwind CSS (via PostCSS)
- SCSS

## License

This project is proprietary software developed for Alpine Digital.

## Support

For issues or questions, please contact the development team.

