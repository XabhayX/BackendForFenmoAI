# Expense Tracker API - Backend

This repository contains the backend service for the Fenmo AI Assessment Expense Tracker application. It provides a RESTful API for user authentication and expense management.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcryptjs for password hashing, cors for cross-origin requests

## Features

- **User Authentication:** 
  - Signup with full name, username, email, and password.
  - Login with email/username and password.
  - Secure JWT-based session management.
- **Expense Management:**
  - Create new expenses with amount, category, date, and description.
  - **Idempotency:** Prevents duplicate expense creation using a unique `idempotencyKey`.
  - Retrieve all expenses for the authenticated user.
  - **Filtering:** Filter expenses by category (e.g., Food, Travel).
  - **Sorting:** Sort expenses by date (Newest First / Oldest First).
    - *Secondary Sort:* Expenses with the same date are sorted by creation time (`createdAt`) for deterministic ordering.
- **Error Handling:** Global error handling for consistent API responses.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local or Atlas URI)

### Installation

1. Clone the repository and navigate to the backend directory:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   CORS_ORIGIN=*
   ACCESS_TOKEN_SECRET=your_secret_key
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=your_refresh_secret_key
   REFRESH_TOKEN_EXPIRY=10d
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/v1/users/register` - Register a new user
- `POST /api/v1/users/login` - Login user
- `POST /api/v1/users/logout` - Logout user

### Expenses
- `POST /api/v1/expenses` - Create a new expense
  - Body: `{ amount, category, date, description, idempotencyKey }`
- `GET /api/v1/expenses` - Get all expenses
  - Query Params: 
    - `category`: Filter by category
    - `sort`: `date_desc` (default) or `date_asc`

## Project Structure

```
src/
├── controllers/  # Request handlers
├── db/           # Database connection
├── middlewares/  # Auth and error middlewares
├── models/       # Mongoose models
├── routes/       # API routes
├── utils/        # Utility functions (asyncHandler, ApiResponse)
└── app.js        # Express app setup
```

## Fenmo AI Assessment Notes

- Use of `idempotencyKey` ensures that network retries do not result in duplicate expenses.
- Deterministic sorting logic was implemented to handle multiple expenses created on the same day.
