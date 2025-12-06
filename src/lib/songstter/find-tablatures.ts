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
  }));
}
