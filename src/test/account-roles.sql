-- Run against the database; each requested account must have exactly its assigned role.
SELECT 'todo1 is admin only' AS rule,
  count(*) = 1 AND bool_and(r.role = 'admin') AS passed
FROM public.user_roles r JOIN auth.users u ON u.id = r.user_id
WHERE lower(u.email) = 'todo1@mailinator.com'
UNION ALL
SELECT 'todo2 is user only' AS rule,
  count(*) = 1 AND bool_and(r.role = 'user') AS passed
FROM public.user_roles r JOIN auth.users u ON u.id = r.user_id
WHERE lower(u.email) = 'todo2@mailinator.com';