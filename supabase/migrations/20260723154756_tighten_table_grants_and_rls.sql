-- New public tables should opt in to Data API access explicitly.
alter default privileges in schema public
revoke select, insert, update, delete on tables from anon;

alter default privileges in schema public
revoke select, insert, update, delete on tables from authenticated;

alter default privileges in schema public
revoke usage, select on sequences from anon;

alter default privileges in schema public
revoke usage, select on sequences from authenticated;

-- Existing tables get only the privileges used by the application.
revoke all privileges on table public.games from anon, authenticated;
revoke all privileges on table public.travels from anon, authenticated;
revoke all privileges on table public.settings from anon, authenticated;
revoke all privileges on table public.users from anon, authenticated;

grant select on table public.games to anon, authenticated;
grant select on table public.travels to anon, authenticated;
grant select on table public.settings to anon, authenticated;
grant select on table public.users to authenticated;

grant insert, update, delete on table public.games to authenticated;
grant insert, update, delete on table public.travels to authenticated;
grant insert, update on table public.settings to authenticated;

-- Avoid evaluating a second permissive SELECT policy on every public read.
drop policy if exists "Enable all operations for ADMIN users only"
  on public.games;

create policy games_insert_admin
  on public.games
  for insert
  to authenticated
  with check ((select public.is_admin()));

create policy games_update_admin
  on public.games
  for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy games_delete_admin
  on public.games
  for delete
  to authenticated
  using ((select public.is_admin()));

drop policy if exists "Enable all operations for ADMIN users only"
  on public.travels;

create policy travels_insert_admin
  on public.travels
  for insert
  to authenticated
  with check ((select public.is_admin()));

create policy travels_update_admin
  on public.travels
  for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy travels_delete_admin
  on public.travels
  for delete
  to authenticated
  using ((select public.is_admin()));
