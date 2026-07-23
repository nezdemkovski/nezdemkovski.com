alter table public.games
  alter column release_year type integer using release_year::integer,
  add constraint games_name_length_check
    check (char_length(btrim(name)) between 1 and 200),
  add constraint games_developer_length_check
    check (char_length(btrim(developer)) between 1 and 200),
  add constraint games_release_year_check
    check (release_year between 1950 and 2100);

alter table public.travels
  add constraint travels_city_length_check
    check (char_length(btrim(city)) between 1 and 200),
  add constraint travels_country_code_check
    check (country_code ~ '^[A-Z]{2}$'),
  add constraint travels_date_range_check
    check (end_date >= start_date);

alter table public.settings
  alter column value type jsonb using value::jsonb,
  alter column updated_at set not null,
  add constraint settings_key_length_check
    check (char_length(btrim(key)) between 1 and 100),
  add constraint settings_current_location_shape_check
    check (
      key <> 'current_location'
      or (
        jsonb_typeof(value) = 'object'
        and value ?& array['city', 'country', 'countryCode', 'timezone']
        and jsonb_typeof(value -> 'city') = 'string'
        and char_length(btrim(value ->> 'city')) between 1 and 200
        and jsonb_typeof(value -> 'country') = 'string'
        and char_length(btrim(value ->> 'country')) between 1 and 200
        and jsonb_typeof(value -> 'countryCode') = 'string'
        and value ->> 'countryCode' ~ '^[A-Z]{2}$'
        and jsonb_typeof(value -> 'timezone') = 'string'
        and char_length(btrim(value ->> 'timezone')) between 1 and 100
      )
    );
