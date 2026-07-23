
-- Add new country_code column
ALTER TABLE travels ADD COLUMN country_code text;

-- Convert emoji flags to ISO 2-letter codes
UPDATE travels SET country_code = CASE country_flag
  WHEN '🇦🇱' THEN 'AL'
  WHEN '🇦🇹' THEN 'AT'
  WHEN '🇧🇪' THEN 'BE'
  WHEN '🇧🇬' THEN 'BG'
  WHEN '🇭🇷' THEN 'HR'
  WHEN '🇨🇿' THEN 'CZ'
  WHEN '🇪🇬' THEN 'EG'
  WHEN '🇫🇷' THEN 'FR'
  WHEN '🇬🇪' THEN 'GE'
  WHEN '🇩🇪' THEN 'DE'
  WHEN '🇬🇷' THEN 'GR'
  WHEN '🇭🇺' THEN 'HU'
  WHEN '🇮🇹' THEN 'IT'
  WHEN '🇲🇹' THEN 'MT'
  WHEN '🇳🇱' THEN 'NL'
  WHEN '🇵🇱' THEN 'PL'
  WHEN '🇪🇸' THEN 'ES'
  WHEN '🇹🇷' THEN 'TR'
  WHEN '🇺🇿' THEN 'UZ'
  ELSE upper(country_flag)
END;

-- Make it required
ALTER TABLE travels ALTER COLUMN country_code SET NOT NULL;

-- Drop the old columns
ALTER TABLE travels DROP COLUMN country_flag;
ALTER TABLE travels DROP COLUMN country;
;
