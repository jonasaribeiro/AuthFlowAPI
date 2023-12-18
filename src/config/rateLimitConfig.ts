import rateLimit from "express-rate-limit";

/**
 * Rate limiter for login attempts.
 * Allows up to 5 login attempts within a 5-minute window.
 */
export const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 100,
  limit: 6,
  message: "Too many login attempts. Please try again in 5 minutes.",
});

/**
 * Rate limiter for account registration.
 * Allows up to 5 account creations from the same IP within a 10-minute window.
 */
export const registerLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 6,
  message:
    "Too many account creations from this IP. Please try again in 10 minutes.",
});

/**
 * Rate limiter for user data patch requests.
 * Allows up to 4 patch requests within a 4-hour window.
 */
export const patchUserLimiter = rateLimit({
  windowMs: 4 * 60 * 60 * 1000,
  limit: 5,
  message: "Too many user patch requests. Please try again in 4 hours.",
});

/**
 * General rate limiter for API requests.
 * Allows up to 20 requests within a 1-minute window.
 */
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  message: "Too many API requests. Please slow down and try again in a minute.",
});
