-- Dados demonstrativos da Fase 3.
-- Não são cardápios nutricionais reais e devem ser substituídos pelo conteúdo fornecido pela proprietária.

INSERT OR IGNORE INTO products (id, nome, descricao, tipo, preco, ativo) VALUES
  ('product-7-days', 'Cardápio 7 dias', 'Uma semana organizada para você saber o que comer e o que preparar.', '7_DIAS', NULL, 1),
  ('product-30-days', 'Cardápio 30 dias', 'Um mês de planejamento para transformar a organização alimentar em rotina.', '30_DIAS', NULL, 1);

INSERT OR IGNORE INTO menus (id, nome, descricao, tipo, ativo) VALUES
  ('menu-demo-7-days', 'Cardápio demonstrativo — 7 dias', 'Estrutura demonstrativa para validação da experiência. Conteúdo real pendente.', '7_DIAS', 1),
  ('menu-demo-30-days', 'Cardápio demonstrativo — 30 dias', 'Estrutura demonstrativa para validação da experiência. Conteúdo real pendente.', '30_DIAS', 1);

INSERT OR IGNORE INTO menu_days (id, menu_id, dia_semana, ordem) VALUES
  ('day-demo-1', 'menu-demo-7-days', 'SEGUNDA', 1),
  ('day-demo-2', 'menu-demo-7-days', 'TERCA', 2),
  ('day-demo-3', 'menu-demo-7-days', 'QUARTA', 3),
  ('day-demo-4', 'menu-demo-7-days', 'QUINTA', 4),
  ('day-demo-5', 'menu-demo-7-days', 'SEXTA', 5),
  ('day-demo-6', 'menu-demo-7-days', 'SABADO', 6),
  ('day-demo-7', 'menu-demo-7-days', 'DOMINGO', 7);

INSERT OR IGNORE INTO meals (id, menu_day_id, tipo_refeicao, descricao, ordem)
SELECT 'meal-demo-' || menu_days.ordem || '-' || meal.tipo, menu_days.id, meal.tipo,
  'Conteúdo demonstrativo — substituir pelo cardápio real.', meal.ordem
FROM menu_days
CROSS JOIN (
  SELECT 'CAFE_MANHA' AS tipo, 1 AS ordem
  UNION ALL SELECT 'COLACAO', 2
  UNION ALL SELECT 'ALMOCO', 3
  UNION ALL SELECT 'LANCHE', 4
  UNION ALL SELECT 'JANTAR', 5
  UNION ALL SELECT 'CEIA', 6
) AS meal
WHERE menu_days.menu_id = 'menu-demo-7-days';
