import { Hono } from "hono";
import { cors } from "hono/cors";
import { getCookie, setCookie } from "hono/cookie";
import {
  exchangeCodeForSessionToken,
  getOAuthRedirectUrl,
  authMiddleware,
  deleteSession,
  getCurrentUser,
  MOCHA_SESSION_TOKEN_COOKIE_NAME,
} from "@getmocha/users-service/backend";
import { CreateVideoRequestSchema } from "@/shared/types";
import { getMissions, completeMission } from "./missions";
import { hashPassword, verifyPassword, generateSessionToken, customAuthMiddleware } from "./auth";

const app = new Hono<{ Bindings: Env }>();

app.use("/*", cors());

// Auth endpoints
app.get("/api/oauth/google/redirect_url", async (c) => {
  try {
    const redirectUrl = await getOAuthRedirectUrl("google", {
      apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
      apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
    });

    return c.json({ redirectUrl }, 200);
  } catch (error) {
    console.error("Failed to get OAuth redirect URL:", error);
    return c.json({ 
      error: "Authentication service unavailable. Please try again later or contact support.",
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

app.post("/api/sessions", async (c) => {
  const body = await c.req.json();

  if (!body.code) {
    return c.json({ error: "No authorization code provided" }, 400);
  }

  const sessionToken = await exchangeCodeForSessionToken(body.code, {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
    maxAge: 60 * 24 * 60 * 60,
  });

  // Get the user info to create profile if needed
  try {
    const user = await getCurrentUser(sessionToken, {
      apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
      apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
    });

    if (user) {
      // Check if profile exists
      const existingProfile = await c.env.DB.prepare(
        "SELECT * FROM user_profiles WHERE user_id = ?"
      )
        .bind(user.id)
        .first();

      // Create profile if it doesn't exist (new user registration)
      if (!existingProfile) {
        await c.env.DB.prepare(
          "INSERT INTO user_profiles (user_id, coins, plan) VALUES (?, 250, 'Free')"
        )
          .bind(user.id)
          .run();
      }
      
      // Log login activity
      await logActivity(c.env.DB, user.id, "login", "Inicio de sesión con Google OAuth");
    }
  } catch (error) {
    console.error("Error creating user profile:", error);
    // Continue anyway - profile will be created on first /api/profile call
  }

  return c.json({ success: true }, 200);
});

// Email/Password Registration endpoint
app.post("/api/register", async (c) => {
  const body = await c.req.json();
  const { name, email, password, phone, address, postal_code, city } = body;

  // Validate required fields
  if (!name || !email || !password || !phone || !address || !postal_code || !city) {
    return c.json({ error: "Todos los campos son requeridos" }, 400);
  }

  if (password.length < 6) {
    return c.json({ error: "La contraseña debe tener al menos 6 caracteres" }, 400);
  }

  const userId = `email_${email.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

  try {
    // Check if user already exists
    const existingCred = await c.env.DB.prepare(
      "SELECT * FROM user_credentials WHERE email = ?"
    )
      .bind(email.toLowerCase())
      .first();

    if (existingCred) {
      return c.json({ error: "Este correo electrónico ya está registrado" }, 400);
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user credentials
    await c.env.DB.prepare(
      "INSERT INTO user_credentials (user_id, email, name, password_hash) VALUES (?, ?, ?, ?)"
    )
      .bind(userId, email.toLowerCase(), name, passwordHash)
      .run();

    // Create user profile with all information
    await c.env.DB.prepare(
      `INSERT INTO user_profiles (user_id, coins, plan, phone, address, postal_code, city) 
       VALUES (?, 250, 'Free', ?, ?, ?, ?)`
    )
      .bind(userId, phone, address, postal_code, city)
      .run();

    // Create session
    const sessionToken = generateSessionToken();
    const expiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString();

    await c.env.DB.prepare(
      "INSERT INTO user_sessions (session_token, user_id, expires_at) VALUES (?, ?, ?)"
    )
      .bind(sessionToken, userId, expiresAt)
      .run();

    setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      path: "/",
      sameSite: "none",
      secure: true,
      maxAge: 60 * 24 * 60 * 60,
    });
    
    // Log registration activity
    await logActivity(c.env.DB, userId, "register", "Registro de nueva cuenta");
    
    return c.json({ 
      success: true, 
      user: { id: userId, email, name } 
    }, 200);
  } catch (error) {
    console.error("Error during registration:", error);
    return c.json({ error: "Error al crear la cuenta" }, 500);
  }
});

// Email/Password Login endpoint
app.post("/api/login", async (c) => {
  const body = await c.req.json();
  const { email, password } = body;

  if (!email || !password) {
    return c.json({ error: "Email y contraseña son requeridos" }, 400);
  }

  try {
    // Get user credentials
    const userCred = await c.env.DB.prepare(
      "SELECT * FROM user_credentials WHERE email = ?"
    )
      .bind(email.toLowerCase())
      .first();

    if (!userCred) {
      return c.json({ error: "Email o contraseña incorrectos" }, 401);
    }

    // Verify password
    const isValid = await verifyPassword(password, userCred.password_hash as string);

    if (!isValid) {
      return c.json({ error: "Email o contraseña incorrectos" }, 401);
    }

    // Create session
    const sessionToken = generateSessionToken();
    const expiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString();

    await c.env.DB.prepare(
      "INSERT INTO user_sessions (session_token, user_id, expires_at) VALUES (?, ?, ?)"
    )
      .bind(sessionToken, userCred.user_id, expiresAt)
      .run();

    setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      path: "/",
      sameSite: "none",
      secure: true,
      maxAge: 60 * 24 * 60 * 60,
    });

    // Log login activity
    await logActivity(c.env.DB, userCred.user_id as string, "login", "Inicio de sesión con email/password");

    return c.json({ 
      success: true, 
      user: { 
        id: userCred.user_id, 
        email: userCred.email, 
        name: userCred.name 
      } 
    }, 200);
  } catch (error) {
    console.error("Error during login:", error);
    return c.json({ error: "Error al iniciar sesión" }, 500);
  }
});

app.get("/api/users/me", customAuthMiddleware, async (c) => {
  return c.json(c.get("user"));
});

app.get("/api/logout", async (c) => {
  const sessionToken = getCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME);

  if (typeof sessionToken === "string") {
    await deleteSession(sessionToken, {
      apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
      apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
    });
  }

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
    maxAge: 0,
  });

  return c.json({ success: true }, 200);
});

// User profile endpoints
app.get("/api/profile", customAuthMiddleware, async (c) => {
  const user = c.get("user");

  let profile = await c.env.DB.prepare(
    "SELECT * FROM user_profiles WHERE user_id = ?"
  )
    .bind(user.id)
    .first();

  if (!profile) {
    await c.env.DB.prepare(
      "INSERT INTO user_profiles (user_id, coins, plan) VALUES (?, 250, 'Free')"
    )
      .bind(user.id)
      .run();

    profile = await c.env.DB.prepare(
      "SELECT * FROM user_profiles WHERE user_id = ?"
    )
      .bind(user.id)
      .first();
  }

  return c.json(profile);
});

app.post("/api/profile/coins", customAuthMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json();
  const { amount, description } = body;

  const profile = await c.env.DB.prepare(
    "SELECT * FROM user_profiles WHERE user_id = ?"
  )
    .bind(user.id)
    .first();

  if (!profile) {
    return c.json({ error: "Profile not found" }, 404);
  }

  const newBalance = (profile.coins as number) + amount;

  await c.env.DB.prepare(
    "UPDATE user_profiles SET coins = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?"
  )
    .bind(newBalance, user.id)
    .run();

  await c.env.DB.prepare(
    "INSERT INTO coin_transactions (user_id, amount, description, balance_after) VALUES (?, ?, ?, ?)"
  )
    .bind(user.id, amount, description, newBalance)
    .run();

  // Log coin transaction activity
  const activityDesc = amount > 0 ? `Monedas agregadas: +${amount}` : `Monedas gastadas: ${amount}`;
  await logActivity(c.env.DB, user.id, "coins_transaction", activityDesc, description || null);

  return c.json({ coins: newBalance });
});

// Videos endpoints
app.get("/api/videos", customAuthMiddleware, async (c) => {
  const user = c.get("user");

  const { results } = await c.env.DB.prepare(
    "SELECT * FROM videos WHERE user_id = ? ORDER BY created_at DESC"
  )
    .bind(user.id)
    .all();

  return c.json(results);
});

app.post("/api/videos", customAuthMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json();
  
  const validated = CreateVideoRequestSchema.parse(body);

  const result = await c.env.DB.prepare(
    "INSERT INTO videos (user_id, name, theme) VALUES (?, ?, ?)"
  )
    .bind(user.id, validated.name, validated.theme)
    .run();

  // Log video creation activity
  await logActivity(c.env.DB, user.id, "video_created", `Video creado: ${validated.name}`, JSON.stringify({ theme: validated.theme }));

  return c.json({ id: result.meta.last_row_id });
});

// Statistics endpoints
app.get("/api/stats", customAuthMiddleware, async (c) => {
  const user = c.get("user");

  const videosCount = await c.env.DB.prepare(
    "SELECT COUNT(*) as count FROM videos WHERE user_id = ?"
  )
    .bind(user.id)
    .first();

  return c.json({
    videos_created: videosCount?.count || 0,
    images_generated: 45,
    songs_created: 8,
  });
});

app.get("/api/coin-history", customAuthMiddleware, async (c) => {
  const user = c.get("user");

  const { results } = await c.env.DB.prepare(
    "SELECT * FROM coin_transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT 7"
  )
    .bind(user.id)
    .all();

  return c.json(results);
});

// Activity logging helper
async function logActivity(db: D1Database, userId: string, activityType: string, description: string, metadata?: string) {
  await db.prepare(
    "INSERT INTO user_activities (user_id, activity_type, description, metadata) VALUES (?, ?, ?, ?)"
  )
    .bind(userId, activityType, description, metadata || null)
    .run();
}

// Get user activities
app.get("/api/activities", customAuthMiddleware, async (c) => {
  const user = c.get("user");

  const { results } = await c.env.DB.prepare(
    "SELECT * FROM user_activities WHERE user_id = ? ORDER BY created_at DESC LIMIT 20"
  )
    .bind(user.id)
    .all();

  return c.json(results);
});

// Missions endpoints
app.get("/api/missions", customAuthMiddleware, getMissions);
app.post("/api/missions/complete", customAuthMiddleware, completeMission);

// Support tickets endpoints
app.get("/api/support/tickets", customAuthMiddleware, async (c) => {
  const user = c.get("user");

  const { results } = await c.env.DB.prepare(
    "SELECT * FROM support_tickets WHERE user_id = ? ORDER BY created_at DESC"
  )
    .bind(user.id)
    .all();

  return c.json(results);
});

app.post("/api/support/tickets", customAuthMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json();
  const { subject, category, message } = body;

  if (!subject || !category || !message) {
    return c.json({ error: "Todos los campos son requeridos" }, 400);
  }

  const result = await c.env.DB.prepare(
    "INSERT INTO support_tickets (user_id, subject, category, message, status, priority) VALUES (?, ?, ?, ?, 'open', 'normal')"
  )
    .bind(user.id, subject, category, message)
    .run();

  // Log support ticket creation activity
  await logActivity(c.env.DB, user.id, "support_ticket", `Ticket de soporte creado: ${subject}`);

  return c.json({ id: result.meta.last_row_id });
});

app.get("/api/support/tickets/:id/responses", customAuthMiddleware, async (c) => {
  const user = c.get("user");
  const ticketId = c.req.param("id");

  // Verify ticket belongs to user
  const ticket = await c.env.DB.prepare(
    "SELECT * FROM support_tickets WHERE id = ? AND user_id = ?"
  )
    .bind(ticketId, user.id)
    .first();

  if (!ticket) {
    return c.json({ error: "Ticket no encontrado" }, 404);
  }

  const { results } = await c.env.DB.prepare(
    "SELECT * FROM support_responses WHERE ticket_id = ? ORDER BY created_at ASC"
  )
    .bind(ticketId)
    .all();

  return c.json(results);
});

export default app;
