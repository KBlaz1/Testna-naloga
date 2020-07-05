export interface Country {
  id: string;
  iso2Code: string;
  name: string;
  region: RAIL;
  adminregion: RAIL;
  incomeLevel: RAIL;
  lendingType: RAIL;
  capitalCity: string;
  longitude: string;
  latitude: string;
}

interface RAIL {
  id: string;
  iso2code: string;
  value: string;
}