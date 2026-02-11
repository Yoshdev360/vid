
CREATE TABLE user_profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL UNIQUE,
  coins INTEGER NOT NULL DEFAULT 250,
  plan TEXT NOT NULL DEFAULT 'Free',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE videos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  theme TEXT,
  file_url TEXT,
  thumbnail_url TEXT,
  size_mb REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE coin_transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  amount INTEGER NOT NULL,
  description TEXT,
  balance_after INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE missions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  task_type TEXT NOT NULL,
  task_url TEXT,
  reward_coins INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_missions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  mission_id INTEGER NOT NULL,
  is_completed BOOLEAN DEFAULT 0,
  completed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_credentials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_token TEXT NOT NULL UNIQUE,
  user_id TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NOT NULL
);

CREATE TABLE user_activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  description TEXT NOT NULL,
  metadata TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE support_tickets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  subject TEXT NOT NULL,
  category TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  priority TEXT NOT NULL DEFAULT 'normal',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE support_responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_id INTEGER NOT NULL,
  is_staff BOOLEAN NOT NULL DEFAULT 0,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE user_profiles ADD COLUMN phone TEXT;
ALTER TABLE user_profiles ADD COLUMN address TEXT;
ALTER TABLE user_profiles ADD COLUMN postal_code TEXT;
ALTER TABLE user_profiles ADD COLUMN city TEXT;

CREATE INDEX idx_user_activities_user_id ON user_activities(user_id);
CREATE INDEX idx_user_activities_created_at ON user_activities(created_at DESC);
CREATE INDEX idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX idx_user_sessions_user ON user_sessions(user_id);
CREATE INDEX idx_coin_transactions_user_id ON coin_transactions(user_id);
CREATE INDEX idx_user_missions_user_id ON user_missions(user_id);
CREATE INDEX idx_user_missions_mission_id ON user_missions(mission_id);
CREATE INDEX idx_user_credentials_email ON user_credentials(email);
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_videos_user_id ON videos(user_id);
CREATE INDEX idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX idx_support_responses_ticket_id ON support_responses(ticket_id);

INSERT INTO missions (title, description, task_type, task_url, reward_coins, is_active) VALUES
('Comparte en Twitter', 'Comparte tu primer video en Twitter y etiquétanos', 'social_media', 'https://twitter.com/motcha_ia', 15, 1),
('Invita a un Amigo', 'Invita a un amigo a usar Motcha IA', 'referral', NULL, 25, 1),
('Completa tu Perfil', 'Agrega toda tu información personal en el perfil', 'profile_complete', NULL, 10, 1),
('Crea 5 Videos', 'Alcanza la meta de crear 5 videos', 'milestone', NULL, 50, 1),
('Escribe una Reseña', 'Deja una reseña sobre tu experiencia con Motcha IA', 'review', NULL, 20, 1),
('Explora Todas las Páginas', 'Visita todas las secciones de la aplicación', 'explore', NULL, 15, 1);

INSERT INTO missions (title, description, task_type, task_url, reward_coins, is_active) VALUES
('Comparte en Instagram', 'Comparte tu primer video en Instagram y etiquétanos @motchaIA', 'social_media', 'https://www.instagram.com/', 50, 1),
('Comparte en TikTok', 'Sube tu video a TikTok con el hashtag #MotchaIA', 'social_media', 'https://www.tiktok.com/', 50, 1),
('Invita a un amigo', 'Comparte Motcha IA con un amigo usando tu enlace de referido', 'referral', NULL, 100, 1),
('Completa tu perfil', 'Completa toda la información de tu perfil de usuario', 'profile_complete', '/profile', 75, 1),
('Crea 3 videos', 'Crea 3 videos diferentes en la plataforma', 'create_video', '/', 150, 1),
('Califica nuestra app', 'Déjanos una reseña de 5 estrellas en las tiendas de apps', 'review', NULL, 80, 1),
('Conecta cuenta de Google', 'Vincula tu cuenta de Google para inicio rápido', 'connect_account', '/config', 40, 1),
('Explora todas las funciones', 'Visita cada sección de la aplicación: Videos, Archivos, Canciones, Misiones', 'explore_app', '/', 60, 1),
('Video de la semana', 'Crea un video con al menos 10 imágenes', 'create_video', '/', 120, 1),
('Maestro creativo', 'Usa al menos 3 modelos de IA diferentes', 'use_ai_models', '/', 90, 1);
