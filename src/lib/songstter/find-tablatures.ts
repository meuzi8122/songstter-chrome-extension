import { fetchSongstterApi } from "./api";

export async function findTablatures(pattern: string) {
  const records = (await fetchSongstterApi("search", { pattern })).records;
  return records.map((record: any) => ({
    id: record.songId,
    title: record.title,
    artist: {
      id: record.artistId,
      name: record.artist,
    },
    intstruments: record.tracks.map((track: any) => ({
      id: track.instrumentId,
      name: track.instrument,
    })),
  }));
}
