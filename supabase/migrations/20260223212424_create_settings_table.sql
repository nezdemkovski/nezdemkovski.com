
-- Create settings table for site-wide config (e.g. current_location)
CREATE TABLE public.settings (
  key        text PRIMARY KEY,
  value      text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Enable row-level security
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Anyone (including anon) can read
CREATE POLICY "settings_select_public"
  ON public.settings FOR SELECT
  USING (true);

-- Admin-only update
CREATE POLICY "settings_update_admin"
  ON public.settings FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Admin-only insert
CREATE POLICY "settings_insert_admin"
  ON public.settings FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

-- Seed default current location
INSERT INTO public.settings (key, value) VALUES ('current_location', 'cz');
;
