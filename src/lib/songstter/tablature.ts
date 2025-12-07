export interface Tablature {
  id: number;
  title: string;
  artist: Artist;
  instruments: Instrument[];
}

export interface Artist {
  id: number;
  name: string;
}

export interface Instrument {
  id: number;
  name: string;
  // tuning: number[];
}
