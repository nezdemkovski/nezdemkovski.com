export type Game = {
  name: string;
  releaseYear: number;
  developer: string;
  platform: Platform;
};

export enum Platform {
  PC = 'PC',
  MACOS = 'Macbook',
  PLAYSTATION = 'PlayStation 5',
  STEAM_DECK = 'Steam Deck',
}

export const games = {
  inProgress: [
    {
      name: 'STAR WARS Jedi: Survivor',
      releaseYear: 2023,
      developer: 'Respawn',
      platform: Platform.PC,
    },
    {
      name: 'Horizon Forbidden West: Burning Shores DLC',
      releaseYear: 2023,
      developer: 'Guerrilla Games',
      platform: Platform.PLAYSTATION,
    },
    {
      name: 'Kingdom Come: Deliverance',
      releaseYear: 2018,
      developer: 'Warhorse Studios',
      platform: Platform.PC,
    },
    {
      name: 'Mass Effect 2',
      releaseYear: 2010,
      developer: 'BioWare',
      platform: Platform.STEAM_DECK,
    },
    {
      name: 'Hi-Fi RUSH',
      releaseYear: 2023,
      developer: 'Tango Gameworks',
      platform: Platform.STEAM_DECK,
    },
    {
      name: 'OUTRIDERS',
      releaseYear: 2021,
      developer: 'People Can Fly',
      platform: Platform.PC,
    },
    {
      name: 'Hogwarts Legacy',
      releaseYear: 2023,
      developer: 'Avalanche Software',
      platform: Platform.PC,
    },
  ],
  2023: [
    {
      name: 'Resident Evil 4',
      releaseYear: 2023,
      developer: 'CAPCOM',
      platform: Platform.PC,
    },
    {
      name: 'Atomic Heart',
      releaseYear: 2023,
      developer: 'Mundfish',
      platform: Platform.PC,
    },
    {
      name: 'God of War Ragnarök',
      releaseYear: 2022,
      developer: 'Santa Monica Studio',
      platform: Platform.PLAYSTATION,
    },
    {
      name: 'Dying Light 2 Stay Human',
      releaseYear: 2022,
      developer: 'Techland',
      platform: Platform.PC,
    },
    {
      name: 'Valheim',
      releaseYear: 2021,
      developer: 'Iron Gate AB',
      platform: Platform.PC,
    },
    {
      name: 'South Park: The Fractured But Whole',
      releaseYear: 2017,
      developer: 'Ubisoft San Francisco',
      platform: Platform.STEAM_DECK,
    },
    {
      name: 'TUNIC',
      releaseYear: 2022,
      developer: 'TUNIC Team',
      platform: Platform.STEAM_DECK,
    },
  ],
  2022: [
    {
      name: 'Vampire Survivors',
      releaseYear: 2022,
      developer: 'poncle',
      platform: Platform.STEAM_DECK,
    },
    {
      name: 'Return to Monkey Island',
      releaseYear: 2022,
      developer: 'Ron Gilbert, Terrible Toybox',
      platform: Platform.MACOS,
    },
    {
      name: "Teenage Mutant Ninja Turtles: Shredder's Revenge",
      releaseYear: 2022,
      developer: 'BlueTwelve Studio',
      platform: Platform.STEAM_DECK,
    },
    {
      name: 'The Quarry',
      releaseYear: 2022,
      developer: 'Supermassive Games',
      platform: Platform.PC,
    },
    {
      name: 'Grim Dawn',
      releaseYear: 2016,
      developer: 'Crate Entertainment',
      platform: Platform.STEAM_DECK,
    },
    {
      name: 'Evil West',
      releaseYear: 2022,
      developer: 'Flying Wild Hog',
      platform: Platform.STEAM_DECK,
    },
    {
      name: 'Nobody Saves the World',
      releaseYear: 2022,
      developer: 'DrinkBox Studios',
      platform: Platform.STEAM_DECK,
    },
    {
      name: 'The Dark Pictures Anthology: The Devil in Me',
      releaseYear: 2022,
      developer: 'Supermassive Games',
      platform: Platform.STEAM_DECK,
    },
    {
      name: 'DOOM Eternal',
      releaseYear: 2020,
      developer: 'id Software',
      platform: Platform.STEAM_DECK,
    },
    {
      name: 'Stray',
      releaseYear: 2022,
      developer: 'Tribute Games',
      platform: Platform.STEAM_DECK,
    },
    {
      name: 'Ori and the Will of the Wisps',
      releaseYear: 2020,
      developer: 'Moon Studios GmbH',
      platform: Platform.STEAM_DECK,
    },
    {
      name: 'Elden Ring',
      releaseYear: 2022,
      developer: 'FromSoftware Inc.',
      platform: Platform.PC,
    },
    {
      name: 'Horizon Forbidden West',
      releaseYear: 2022,
      developer: 'Guerrilla Games',
      platform: Platform.PLAYSTATION,
    },
  ],
  2021: [
    {
      name: 'Resident Evil Village',
      releaseYear: 2021,
      developer: 'CAPCOM Co., Ltd.',
      platform: Platform.PC,
    },
    {
      name: 'Disco Elysium - The Final Cut',
      releaseYear: 2019,
      developer: 'ZA/UM',
      platform: Platform.MACOS,
    },
    {
      name: 'Hades',
      releaseYear: 2020,
      developer: 'Supergiant Games',
      platform: Platform.MACOS,
    },
  ],
};

export const PCBuildData = {
  cpu: 'AMD Ryzen 9 7900X',
  gpu: 'AMD Radeon RX 6800 XT',
  motherBoard: 'ASUS ROG STRIX B650E-I GAMING WIFI',
  ram: 'Kingston 32GB KIT DDR5 5600MHz CL36 FURY Beast Black EXPO',
  ssd: 'Samsung 980 PRO 1TB',
  powerSupply: 'Corsair SF750 750W',
  waterCooling: 'ASUS ROG STRIX LC II 240',
  case: 'LIAN-LI DAN A4-H2O X4, black',
};
