create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.users (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email
  );

  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public;
revoke execute on function public.handle_new_user() from anon;
revoke execute on function public.handle_new_user() from authenticated;

create or replace function public.is_admin()
returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
begin
  return exists (
    select 1
    from public.users
    where id = (select auth.uid())
      and user_rights = 'ADMIN'
  );
end;
$$;

create or replace function public.generate_range()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.range_text := case
    when extract(month from new.start_date) = extract(month from new.end_date)
      then to_char(new.start_date, 'FMMonth')
    else
      to_char(new.start_date, 'FMMonth')
      || '...'
      || to_char(new.end_date, 'FMMonth')
  end;

  return new;
end;
$$;
