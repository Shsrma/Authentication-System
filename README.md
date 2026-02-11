# Authentication System

A production-grade **Full-Stack MERN Authentication System** with **Firebase Google Sign-In**, **Two-Factor Authentication (2FA)**, and enterprise-level security features.

---

## 📌 Project Overview

This is a comprehensive authentication system featuring:
- **Email/Password Authentication** with JWT tokens
- **Google Sign-In** via Firebase Authentication
- **Two-Factor Authentication (2FA)** using TOTP (Time-based One-Time Password)
- **Protected Routes** with automatic token refresh
- **Secure Session Management** with HTTP-only cookies
- **Rate Limiting** and security headers

Built following **FAANG-level engineering practices** and suitable for production deployment.

---

## 🎯 Key Features

### Authentication Methods
- ✅ **Email/Password Login** with bcrypt password hashing
- ✅ **Google Sign-In** via Firebase OAuth
- ✅ **Two-Factor Authentication (2FA)** with QR code setup
- ✅ **JWT-based Session Management** (Access + Refresh tokens)
- ✅ **Automatic Token Refresh** on expiry

### Security Features
- 🔐 **Password Hashing** using bcrypt (10 rounds)
- 🔐 **HTTP-only Cookies** for token storage
- 🔐 **Access Token Expiry**: 15 minutes
- 🔐 **Refresh Token Expiry**: 7 days
- 🔐 **Rate Limiting** on authentication endpoints
- 🔐 **Helmet.js** for security headers
- 🔐 **Content Security Policy (CSP)** configured for Firebase/Google
- 🔐 **Error Sanitization** in production (no sensitive data leakage)
- 🔐 **CORS** protection with credentials support

### Frontend Features
- ⚛️ **React Context API** for global auth state
- ⚛️ **Protected Routes** with automatic redirects
- ⚛️ **Axios Interceptors** for seamless token refresh
- ⚛️ **Framer Motion** animations for smooth UX
- ⚛️ **Responsive Design** with gradient backgrounds

---

## 🧱 Tech Stack

### Frontend
- **React** 18
- **React Router** v6
- **Axios** for API calls
- **Framer Motion** for animations
- **Firebase** (Client SDK) for Google Auth

### Backend
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **Firebase Admin SDK** for token verification
- **JWT** (jsonwebtoken)
- **bcrypt** for password hashing
- **Speakeasy** for 2FA TOTP generation
- **QRCode** for 2FA setup
- **Helmet** for security headers
- **express-rate-limit** for rate limiting

---

## 🔐 Authentication Flows

### 1. Email/Password Login
1. User submits email and password
2. Backend validates credentials and checks if 2FA is enabled
3. If 2FA enabled → prompt for 6-digit code
4. If 2FA disabled or code valid → issue Access + Refresh tokens
5. Tokens stored in HTTP-only cookies

### 2. Google Sign-In
1. User clicks "Sign in with Google"
2. Firebase popup opens for Google authentication
3. Frontend receives Firebase ID token
4. Token sent to backend `/google-login` endpoint
5. Backend verifies token with Firebase Admin SDK
6. User found/created in database
7. Access + Refresh tokens issued

### 3. Two-Factor Authentication (2FA)
1. User navigates to Profile → Setup 2FA
2. Backend generates TOTP secret using Speakeasy
3. QR code displayed for scanning with authenticator app
4. User enters 6-digit code to verify
5. 2FA enabled flag set in database
6. Future logins require 2FA code after password

### 4. Token Refresh Flow
1. Access token expires after 15 minutes
2. Axios interceptor catches 401 error
3. Automatically calls `/auth/refresh` endpoint
4. New access token issued using refresh token
5. Original request retried with new token

---

## 🛠 Environment Variables

### Backend `.env`
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/auth_system
JWT_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
FRONTEND_URL=http://localhost:3000
NODE_ENV=development

# Firebase Admin SDK (Option 1: Service Account Key File)
# Place serviceAccountKey.json in backend/ directory

# Firebase Admin SDK (Option 2: Environment Variables)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### Frontend `.env`
```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef
```

---

## ▶️ Run Locally

### Prerequisites
- Node.js 16+
- MongoDB running locally or MongoDB Atlas URI
- Firebase project (for Google Sign-In)

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm start
```

The app will be available at `http://localhost:3000`

---

## 📦 Project Structure

```
Authentication-System/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js              # MongoDB connection
│   │   │   └── firebase.js        # Firebase Admin SDK
│   │   ├── controllers/
│   │   │   ├── authController.js  # Auth logic (login, signup, Google)
│   │   │   └── twoFactorController.js  # 2FA setup & validation
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js      # JWT verification
│   │   │   └── error.middleware.js     # Error handling
│   │   ├── models/
│   │   │   └── User.js            # User schema
│   │   ├── routes/
│   │   │   └── authRoutes.js      # API routes
│   │   └── utils/
│   │       └── token.util.js      # Token generation
│   ├── server.js                  # Express app entry
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js           # Axios instance with interceptors
│   │   ├── components/
│   │   │   └── ProtectedRoute.js  # Route guard
│   │   ├── config/
│   │   │   └── firebase.js        # Firebase Client SDK
│   │   ├── context/
│   │   │   └── AuthContext.js     # Auth state management
│   │   ├── pages/
│   │   │   ├── Login.js           # Login page
│   │   │   ├── Signup.js          # Signup page
│   │   │   ├── Profile.js         # User profile
│   │   │   └── TwoFactorSetup.js  # 2FA setup page
│   │   ├── App.js
│   │   └── index.js
│   └── .env
└── README.md
```

---

## 🛡 Security Highlights

| Feature | Implementation |
|---------|---------------|
| Password Storage | bcrypt hashing (10 salt rounds) |
| Token Storage | HTTP-only cookies (XSS protection) |
| Token Expiry | Access: 15min, Refresh: 7 days |
| Token Invalidation | Refresh tokens deleted on logout |
| Rate Limiting | 100 requests per 15 minutes per IP |
| Security Headers | Helmet.js with CSP for Firebase |
| Error Handling | Sanitized errors in production |
| CORS | Configured with credentials support |
| 2FA | TOTP-based (Speakeasy + QRCode) |
| Google Auth | Firebase ID token verification |

---

## 🧪 Testing the Application

### 1. Standard Email/Password Flow
1. Navigate to `http://localhost:3000`
2. Click "Sign up" and create an account
3. Login with credentials
4. Access Profile page

### 2. Two-Factor Authentication
1. Login and go to Profile
2. Click "Setup 2FA"
3. Scan QR code with Google Authenticator or Authy
4. Enter 6-digit code to verify
5. Logout and login again
6. Verify 2FA code is required

### 3. Google Sign-In
1. Click "Sign in with Google" on Login page
2. Complete Google authentication
3. Verify redirect to Profile
4. Check that user is created in MongoDB

---

## 📚 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | Login with email/password | No |
| POST | `/api/auth/google-login` | Login with Google | No |
| POST | `/api/auth/refresh` | Refresh access token | Yes (Refresh Token) |
| POST | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/auth/profile` | Get user profile | Yes |
| POST | `/api/auth/2fa/setup` | Generate 2FA secret | Yes |
| POST | `/api/auth/2fa/verify` | Verify and enable 2FA | Yes |
| POST | `/api/auth/2fa/validate` | Validate 2FA code | No |

---

## 🚀 Deployment Considerations

### Backend
- Set `NODE_ENV=production`
- Use MongoDB Atlas for database
- Store Firebase service account key securely (environment variables preferred)
- Enable HTTPS
- Configure CORS for production domain

### Frontend
- Build production bundle: `npm run build`
- Update API base URL to production backend
- Add Firebase config to production environment variables
- Deploy to Vercel/Netlify

---

## 📖 References

- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [JWT Documentation](https://jwt.io/)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Speakeasy (2FA)](https://www.npmjs.com/package/speakeasy)
- [bcrypt Documentation](https://www.npmjs.com/package/bcrypt)

---

## 👤 Author

**Ankur Sharma**  
Full-Stack Developer | MERN Stack | Security-Focused Engineering

🌐 Portfolio: [https://ankur-sharma-20.vercel.app](https://ankur-sharma-20.vercel.app)  
🐙 GitHub: [https://github.com/Shsrma](https://github.com/Shsrma)

---

## 📸 Screenshots

<img width="953" height="535" alt="Login Page" src="https://github.com/user-attachments/assets/224a2417-58ed-46b8-8917-14bd8b4a7cd4" />
<img width="959" height="533" alt="Profile Page" src="https://github.com/user-attachments/assets/b91e54b2-7298-4610-a609-4fffede5d6b8" />
