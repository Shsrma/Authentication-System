const mongoose = require("mongoose");
const User = require("./src/models/User");
const speakeasy = require("speakeasy");
const dotenv = require("dotenv");

dotenv.config();

const seed = async () => {
     try {
          await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/auth_system");

          await User.deleteOne({ email: "test2fa@example.com" });

          const secret = speakeasy.generateSecret({ name: "TestUser" });

          // Create user with known password and random secret
          // Note: In real app, password would be hashed. We need to rely on the User model's pre-save hook.
          const user = new User({
               name: "Test User 2FA",
               email: "test2fa@example.com",
               password: "password123", // Will be hashed by pre-save
               isTwoFactorEnabled: true,
               twoFactorSecret: secret.base32
          });

          await user.save();

          console.log("User created!");
          console.log("Email: test2fa@example.com");
          console.log("Password: password123");
          console.log("Secret: " + secret.base32);

          // We need to output the current token so the browser agent can use it immediately if needed, 
          // but better to just output the secret so we can generate tokens dynamically.

          process.exit();
     } catch (err) {
          console.error(err);
          process.exit(1);
     }
};

seed();
