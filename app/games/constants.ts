import type { Database } from '@/database.types';

type Platform = Database['public']['Enums']['platform_type'];

export const PLATFORM_TYPES = [
  'PC',
  'Macbook',
  'PlayStation 4',
  'PlayStation 5',
  'Steam Deck',
  'Yuzu Nintendo Switch Emulator',
] as const satisfies readonly Platform[];
