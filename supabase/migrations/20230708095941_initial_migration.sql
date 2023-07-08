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
create policy "Enable read access for all users" on games as permissive for select to public using (true);

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


CREATE OR REPLACE FUNCTION generate_range()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.range_text := CASE
                     WHEN EXTRACT(MONTH FROM NEW.start_date) = EXTRACT(MONTH FROM NEW.end_date) THEN
                         TO_CHAR(NEW.start_date, 'FMMonth')
                     ELSE
                                 TO_CHAR(NEW.start_date, 'FMMonth') || '...' || TO_CHAR(NEW.end_date, 'FMMonth')
        END;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger on the "travels" table
CREATE TRIGGER generate_range_trigger
    BEFORE INSERT OR UPDATE
    ON travels
    FOR EACH ROW
EXECUTE FUNCTION generate_range();
