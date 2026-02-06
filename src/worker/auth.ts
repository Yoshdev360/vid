import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { getCurrentUser, MOCHA_SESSION_TOKEN_COOKIE_NAME } from "@getmocha/users-service/backend";

// Simple password hashing (in production, use bcrypt or similar)
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

export function generateSessionToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Custom auth middleware that handles both Google OAuth and email/password sessions
export async function customAuthMiddleware(c: Context, next: Next) {
  const sessionToken = getCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME);

  if (!sessionToken) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  // Try to get user from Google OAuth first
  try {
    const user = await getCurrentUser(sessionToken, {
      apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
      apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
    });

    if (user) {
      c.set("user", user);
      return next();
    }
  } catch (error) {
    // If Google OAuth fails, try local sessions
  }

  // Check local session
  const session = await c.env.DB.prepare(
    "SELECT * FROM user_sessions WHERE session_token = ? AND expires_at > datetime('now')"
  )
    .bind(sessionToken)
    .first();

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  // Get user credentials
  const userCred = await c.env.DB.prepare(
    "SELECT * FROM user_credentials WHERE user_id = ?"
  )
    .bind(session.user_id)
    .first();

  if (!userCred) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  // Set user in context (compatible with Mocha's user format)
  c.set("user", {
    id: userCred.user_id as string,
    email: userCred.email as string,
    google_user_data: {
      name: userCred.name as string,
      email: userCred.email as string,
    },
  });

  return next();
}
