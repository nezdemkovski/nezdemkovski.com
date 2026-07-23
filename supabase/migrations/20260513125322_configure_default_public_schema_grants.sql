-- Preserve current Data API behavior for future tables created in public schema
-- after Supabase explicit grant changes rollout.

alter default privileges in schema public
grant select, insert, update, delete on tables to anon;

alter default privileges in schema public
grant select, insert, update, delete on tables to authenticated;

alter default privileges in schema public
grant select, insert, update, delete on tables to service_role;

alter default privileges in schema public
grant usage, select on sequences to anon;

alter default privileges in schema public
grant usage, select on sequences to authenticated;

alter default privileges in schema public
grant usage, select on sequences to service_role;

comment on schema public is 'Configured with explicit default grants for Supabase Data API compatibility.';;
