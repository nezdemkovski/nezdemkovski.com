export type Trip = {
  city: string;
  country: string;
  month: string;
  flag: string;
};

export const countries = {
  2023: [
    { city: 'Szklarska Poręba', country: 'Poland', month: 'April', flag: '🇵🇱' },
    { city: 'Burgas', country: 'Bulgaria', month: 'January', flag: '🇧🇬' },
    { city: 'Cappadocia', country: 'Turkey', month: 'January', flag: '🇹🇷' },
  ],
  2022: [
    {
      city: 'Mahmutlar',
      country: 'Turkey',
      month: 'November...January',
      flag: '🇹🇷',
    },
    { city: 'Alanya', country: 'Turkey', month: 'November', flag: '🇹🇷' },
    { city: 'Antalya', country: 'Turkey', month: 'November', flag: '🇹🇷' },
    {
      city: 'Istanbul',
      country: 'Turkey',
      month: 'October...November',
      flag: '🇹🇷',
    },
    { city: 'Burgas', country: 'Bulgaria', month: 'October', flag: '🇧🇬' },
    { city: 'Janské Lázně', country: 'Czechia', month: 'August', flag: '🇨🇿' },
    { city: 'Hannover', country: 'Germany', month: 'August', flag: '🇩🇪' },
    { city: 'Most', country: 'Czechia', month: 'August', flag: '🇨🇿' },
    { city: 'Brno', country: 'Czechia', month: 'July', flag: '🇨🇿' },
    { city: 'Budapest', country: 'Hungary', month: 'June', flag: '🇭🇺' },
    { city: 'Varna', country: 'Bulgaria', month: 'April', flag: '🇧🇬' },
    { city: 'Burgas', country: 'Bulgaria', month: 'April', flag: '🇧🇬' },
    { city: 'Špindlerův Mlýn', country: 'Czechia', month: 'March', flag: '🇨🇿' },
  ],
  '2020': [
    { city: 'Korfu', country: 'Greece', month: 'August', flag: '🇬🇷' },
    { city: 'Berlin', country: 'Germany', month: 'February', flag: '🇩🇪' },
  ],
  '2019': [
    { city: 'Mellieha', country: 'Malta', month: 'December', flag: '🇲🇹' },
    { city: 'Budapest', country: 'Hungary', month: 'November', flag: '🇭🇺' },
    { city: 'Berlin', country: 'Germany', month: 'October', flag: '🇩🇪' },
    { city: 'Wrocław', country: 'Poland', month: 'September', flag: '🇵🇱' },
    { city: 'Crete', country: 'Greece', month: 'September', flag: '🇬🇷' },
    { city: 'Dresden', country: 'Germany', month: 'July', flag: '🇩🇪' },
    { city: 'Barcelona', country: 'Spain', month: 'May', flag: '🇪🇸' },
    { city: 'Linz', country: 'Austria', month: 'April', flag: '🇦🇹' },
    { city: 'Munich', country: 'Germany', month: 'February', flag: '🇩🇪' },
  ],
  '2018': [
    { city: 'Rome', country: 'Italy', month: 'November', flag: '🇮🇹' },
    { city: 'Budapest', country: 'Hungary', month: 'September', flag: '🇭🇺' },
    { city: 'Barcelona', country: 'Spain', month: 'August', flag: '🇪🇸' },
    { city: 'Berlin', country: 'Germany', month: 'June', flag: '🇩🇪' },
    { city: 'Wrocław', country: 'Poland', month: 'June', flag: '🇵🇱' },
    { city: 'Split', country: 'Croatia', month: 'May...June', flag: '🇭🇷' },
    { city: 'Barcelona', country: 'Spain', month: 'March', flag: '🇪🇸' },
    { city: 'Brussels', country: 'Belgium', month: 'January', flag: '🇧🇪' },
    { city: 'Amsterdam', country: 'Netherlands', month: 'January', flag: '🇳🇱' },
    { city: 'Eindhoven', country: 'Netherlands', month: 'January', flag: '🇳🇱' },
  ],
  '2017': [
    { city: 'Neapol', country: 'Italy', month: 'November', flag: '🇮🇹' },
    { city: 'Berlin', country: 'Germany', month: 'October', flag: '🇩🇪' },
    { city: 'Wrocław', country: 'Poland', month: 'July', flag: '🇵🇱' },
  ],
  '2016': [
    { city: 'Berlin', country: 'Germany', month: 'December', flag: '🇩🇪' },
    { city: 'Berlin', country: 'Germany', month: 'July', flag: '🇩🇪' },
    { city: 'Frankfurt', country: 'Germany', month: 'May', flag: '🇩🇪' },
    { city: 'Cologne', country: 'Germany', month: 'March', flag: '🇩🇪' },
  ],
  2015: [
    { city: 'Vienna', country: 'Austria', month: 'December', flag: '🇦🇹' },
    { city: 'Bavaria', country: 'Germany', month: 'August', flag: '🇩🇪' },
  ],
  2014: [
    { city: 'Berlin', country: 'Germany', month: 'April', flag: '🇩🇪' },
    { city: 'Berlin', country: 'Germany', month: 'February', flag: '🇩🇪' },
  ],
  2011: [
    { city: 'Samarkand', country: 'Uzbekistan', month: 'August', flag: '🇺🇿' },
    {
      city: 'Tashkent',
      country: 'Uzbekistan',
      month: 'June...August',
      flag: '🇺🇿',
    },
  ],
};
