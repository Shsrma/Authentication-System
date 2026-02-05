const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const User = require("../models/User");
const { success } = require("../utils/response.util");
const { generateAccessToken, generateRefreshToken } = require("../utils/token.util");

// Setup 2FA - Generate Secret & QR Code
exports.setup2FA = async (req, res, next) => {
     try {
          const secret = speakeasy.generateSecret({
               name: `AuthSystem (${req.user.email})`,
          });

          const user = await User.findById(req.user.id).select("+twoFactorSecret");
          user.twoFactorSecret = secret.base32;
          await user.save();

          qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
               if (err) return next(err);
               success(res, { secret: secret.base32, qrCode: data_url }, "2FA Setup initiated");
          });
     } catch (error) {
          next(error);
     }
};

// Verify 2FA - Enable it
exports.verify2FA = async (req, res, next) => {
     try {
          const { token } = req.body;
          const user = await User.findById(req.user.id).select("+twoFactorSecret");

          const verified = speakeasy.totp.verify({
               secret: user.twoFactorSecret,
               encoding: "base32",
               token,
          });

          if (verified) {
               user.isTwoFactorEnabled = true;
               await user.save();
               success(res, null, "2FA enabled successfully");
          } else {
               res.status(400).json({ message: "Invalid token" });
          }
     } catch (error) {
          next(error);
     }
};

// Validate 2FA - During Login
exports.validate2FA = async (req, res, next) => {
     try {
          const { userId, token } = req.body;
          const user = await User.findById(userId).select("+twoFactorSecret");

          if (!user) {
               return res.status(404).json({ message: "User not found" });
          }

          const verified = speakeasy.totp.verify({
               secret: user.twoFactorSecret,
               encoding: "base32",
               token,
          });

          if (verified) {
               const accessToken = generateAccessToken(user._id);
               const refreshToken = generateRefreshToken(user._id);

               user.refreshToken = refreshToken;
               await user.save();

               // Set HTTP-only cookies
               res.cookie("accessToken", accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 15 * 60 * 1000,
               });

               res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
               });

               success(res, { userId: user._id }, "Login successful");
          } else {
               res.status(400).json({ message: "Invalid token" });
          }
     } catch (error) {
          next(error);
     }
};
