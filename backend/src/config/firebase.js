const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

// Check if service account key is provided via file path or environment variables
// Ideally, use environment variables for security in production

/* 
  To use a service account file:
  1. Download serviceAccountKey.json from Firebase Console -> Project Settings -> Service Accounts
  2. Place it in backend root (add to .gitignore!)
  3. Set GOOGLE_APPLICATION_CREDENTIALS in .env to point to it
  OR:
  Use environment variables for each field as shown below (safer for CI/CD)
*/

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
};

// If credentials are not fully present in env, try default application credentials
// or initialize with no arguments if running in a Google Cloud environment
try {
  if (serviceAccount.project_id && serviceAccount.private_key && serviceAccount.client_email) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase Admin initialized with Environment Variables");
  } else {
    admin.initializeApp(); // Fallback to ADC or emulator
    console.log("Firebase Admin initialized with Default Credentials");
  }
} catch (error) {
  console.error("Firebase Admin initialization failed:", error.message);
}

module.exports = admin;
