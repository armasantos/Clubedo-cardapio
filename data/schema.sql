-- Clube do Cardápio — modelo mínimo do MVP
-- Compatível com SQLite. Preços e conteúdo real devem ser cadastrados pela proprietária.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  auth TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('7_DIAS', '30_DIAS')),
  preco INTEGER,
  ativo INTEGER NOT NULL DEFAULT 1 CHECK (ativo IN (0, 1))
);

CREATE TABLE IF NOT EXISTS menus (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('7_DIAS', '30_DIAS')),
  ativo INTEGER NOT NULL DEFAULT 1 CHECK (ativo IN (0, 1))
);

CREATE TABLE IF NOT EXISTS menu_days (
  id TEXT PRIMARY KEY,
  menu_id TEXT NOT NULL REFERENCES menus(id) ON DELETE CASCADE,
  dia_semana TEXT NOT NULL,
  ordem INTEGER NOT NULL,
  UNIQUE(menu_id, ordem)
);

CREATE TABLE IF NOT EXISTS meals (
  id TEXT PRIMARY KEY,
  menu_day_id TEXT NOT NULL REFERENCES menu_days(id) ON DELETE CASCADE,
  tipo_refeicao TEXT NOT NULL CHECK (tipo_refeicao IN ('CAFE_MANHA', 'COLACAO', 'ALMOCO', 'LANCHE', 'JANTAR', 'CEIA')),
  descricao TEXT NOT NULL,
  ordem INTEGER NOT NULL,
  UNIQUE(menu_day_id, tipo_refeicao)
);

CREATE TABLE IF NOT EXISTS purchases (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  product_id TEXT NOT NULL REFERENCES products(id),
  status TEXT NOT NULL DEFAULT 'PENDENTE' CHECK (status IN ('PENDENTE', 'PAGO', 'CANCELADO')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_menu_days_menu_id ON menu_days(menu_id);
CREATE INDEX IF NOT EXISTS idx_meals_menu_day_id ON meals(menu_day_id);
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
