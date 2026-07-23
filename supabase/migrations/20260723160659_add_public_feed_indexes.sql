create index if not exists games_finished_date_desc_idx
  on public.games (finished_date desc);

create index if not exists travels_start_date_desc_idx
  on public.travels (start_date desc);
