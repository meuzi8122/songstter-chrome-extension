export type Tablature = {
  id: number;
  title: string;
  artist: Artist;
  instruments: Instrument[];
};

export type Artist = {
  id: number;
  name: string;
};

export type Instrument = (typeof INSTRUMENTS)[number];

export const INSTRUMENTS = ["Guitar", "Bass"] as const;
