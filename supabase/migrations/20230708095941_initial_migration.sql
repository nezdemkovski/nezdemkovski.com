create type user_rights as enum ('ADMIN', 'USER');

create table users
(
    id          uuid                       not null,
    full_name   text                       not null,
    email       text                       not null,
    user_rights user_rights default 'USER' not null,

    primary key (id),
    foreign key (id) references auth.users (id) on update cascade on delete cascade
);

alter table users
    enable row level security;
create policy "Enable read access for user" on users for select using (auth.uid() = id);

create or replace function handle_new_user() returns trigger
    language plpgsql
    security definer set search_path = public as
$$
begin
    insert into users (id, full_name, email)
    values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''), new.email);
    return new;
end;
$$;

create or replace function is_admin() returns boolean
    language plpgsql as
$$
begin
    return exists ( select 1 from users where id = auth.uid() and user_rights = 'ADMIN' );
end;
$$;

create trigger on_auth_user_created
    after insert
    on auth.users
    for each row
execute procedure handle_new_user();

create type platform_type as enum ('PC', 'Macbook', 'PlayStation 4', 'PlayStation 5', 'Steam Deck', 'Yuzu Nintendo Switch Emulator');
create table games
(
    id            uuid primary key         not null default gen_random_uuid(),
    name          text                     not null,
    release_year  numeric                  not null,
    developer     text                     not null,
    platform      platform_type            not null,
    finished_date date                     not null default now(),
    created_at    timestamp with time zone not null default now()
);

alter table games
    enable row level security;
create policy "Enable read access for all users" on games as permissive for select to public using (true);

create policy "Enable all operations for ADMIN users only" on games for all using (is_admin());

create table travels
(
    id           uuid primary key         not null default gen_random_uuid(),
    city         text                     not null,
    country      text                     not null,
    country_flag text                     not null,
    start_date   date                     not null default now(),
    end_date     date                     not null default now(),
    range_text   text                     not null,
    created_at   timestamp with time zone not null default now()
);

alter table travels
    enable row level security;
create policy "Enable read access for all users" on travels as permissive for select to public using (true);


create or replace function generate_range() returns trigger as
$$
begin
    new.range_text := case when extract(month from new.start_date) = extract(month from new.end_date)
                               then to_char(new.start_date, 'FMMonth')
                           else to_char(new.start_date, 'FMMonth') || '...' || to_char(new.end_date, 'FMMonth') end;
    return new;
end;
$$ language plpgsql;

create trigger generate_range_trigger
    before insert or update
    on travels
    for each row
execute function generate_range();
