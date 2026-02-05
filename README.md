# Authentication-System

A production-grade **MERN Authentication System** implementing secure, scalable, and industry-standard authentication practices inspired by FAANG-level engineering.

---

## 📌 Project Overview

This project is a full-stack authentication system featuring **signup, login, protected routes, profile management, access & refresh token flow**, and secure logout.

It demonstrates **real-world backend security patterns** and **clean frontend authentication architecture**, making it suitable for internships, placements, and technical interviews.

---

## 🎯 Key Features

### Backend
- JWT-based authentication (Access + Refresh tokens)
- Access Token expiry: **15 minutes**
- Refresh Token expiry: **7 days**
- Refresh tokens stored securely in MongoDB
- HTTP-only cookies for token storage
- Secure logout with refresh token invalidation
- Password hashing using bcrypt
- Rate limiting on authentication routes
- Centralized async error handling
- Environment-based configuration

### Frontend
- React Context-based authentication state
- Protected routes for authorized users only
- Axios interceptors for automatic token refresh
- Clean and minimal authentication UI
- Smooth, premium animations using Framer Motion
- Pinterest-style soft motion (fade, slide, scale)

---

## 🧱 Tech Stack

### Frontend
- React
- Context API
- Axios
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication & Security
- JWT (Access & Refresh Tokens)
- bcrypt
- HTTP-only Cookies
- Helmet
- Rate Limiting

---

## 🔐 Authentication Flow

1. User logs in with credentials
2. Server generates Access & Refresh tokens
3. Access token is used for protected API calls
4. When the Access token expires:
   - Axios interceptor calls the refresh endpoint
   - A new Access token is issued
5. On logout:
   - Refresh token is deleted from the database
   - Cookies are cleared securely

---

## 🛠 Environment Variables

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
CLIENT_URL=http://localhost:3000
▶️ Run Locally
Backend
cd backend
npm install
npm run dev
Frontend
cd frontend
npm install
npm start
🛡 Security Highlights
Encrypted password storage using bcrypt

Short-lived access tokens

Long-lived refresh tokens with database persistence

Token invalidation on logout

Rate limiting to prevent brute-force attacks

Centralized error handling middleware

📦 Project Structure
backend/
  ├── src/
  │   ├── config/
  │   ├── controllers/
  │   ├── middleware/
  │   ├── models/
  │   ├── routes/
  │   └── utils/
frontend/
  ├── src/
  │   ├── api/
  │   ├── components/
  │   ├── context/
  │   └── pages/
🚀 Future Improvements
Email verification

Password reset flow

OAuth authentication (Google / GitHub)

Role-Based Access Control (RBAC)

Refresh token rotation

📚 References
React Docs: https://react.dev/

Express Docs: https://expressjs.com/

JWT Docs: https://jwt.io/

bcrypt Docs: https://www.npmjs.com/package/bcrypt

👤 Author
Ankur Sharma
Full-Stack Developer | MERN | Security-Focused Engineering

🌐 Portfolio: https://ankur-sharma-20.vercel.app
🐙 GitHub: https://github.com/Shsrma

<img width="953" height="535" alt="A1" src="https://github.com/user-attachments/assets/224a2417-58ed-46b8-8917-14bd8b4a7cd4" />
<img width="959" height="533" alt="A2" src="https://github.com/user-attachments/assets/b91e54b2-7298-4610-a609-4fffede5d6b8" />
