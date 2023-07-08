create type platform_type as enum ('PC', 'Macbook', 'PlayStation 5', 'Steam Deck', 'Yuzu Nintendo Switch Emulator');


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


create policy "Enable read access for all users" on games as permissive
    for
    select to public using (true);


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


CREATE policy "Enable read access for all users" on travels as permissive
    for
    select to public using (true);


create or replace function generate_range() returns trigger as
$$
BEGIN
    NEW.range := CASE
                     WHEN EXTRACT(MONTH FROM NEW.start_date) = EXTRACT(MONTH FROM NEW.end_date) THEN
                         TO_CHAR(NEW.start_date, 'FMMonth')
                     ELSE
                                 TO_CHAR(NEW.start_date, 'FMMonth') || '...' || TO_CHAR(NEW.end_date, 'FMMonth')
        END;
    RETURN NEW;
END;
$$ language plpgsql;

create trigger generate_range_trigger
    before
        insert
        or
        update
    on travels
    for each row
execute function generate_range();