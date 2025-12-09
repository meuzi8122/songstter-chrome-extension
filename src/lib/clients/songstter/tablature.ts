export type Tablature = {
  id: number;
  title: string;
  artist: string;
  instruments: Instrument[];
};

export type Instrument = (typeof INSTRUMENTS)[number];

export const INSTRUMENTS = ["Guitar", "Bass"] as const;
