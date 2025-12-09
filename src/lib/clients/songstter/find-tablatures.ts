import { fetchSongstterApi } from "./api";
import { Instrument, Tablature } from "./tablature";

export async function findTablatures(
  pattern: string,
  artist: string,
  favoriteInstruments: Instrument[]
): Promise<Tablature[]> {
  const records = (await fetchSongstterApi("search", { pattern })).records;

  return records.flatMap((record: any) => {
    if (record.artist.toLowerCase() !== artist.toLowerCase()) {
      return [];
    }

    const tablature: Tablature = {
      id: record.songId,
      title: record.title,
      artist: record.artist,
      instruments: [],
    };

    const instruments: string[] = record.tracks.map(
      (track: any) => track.instrument
    );

    const isTargetInstrument = (keyword: Instrument) =>
      favoriteInstruments.includes(keyword) &&
      instruments.some((instrument) => instrument.includes(keyword));

    if (isTargetInstrument("Guitar")) {
      tablature.instruments.push("Guitar");
    }

    if (isTargetInstrument("Bass")) {
      tablature.instruments.push("Bass");
    }

    if (tablature.instruments.length === 0) {
      return [];
    }

    return tablature;
  });
}
