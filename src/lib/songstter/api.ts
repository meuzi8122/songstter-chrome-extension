const BASE_URL = "https://www.songsterr.com/api";

export async function fetchSongstterApi(
  endpoint: string,
  queries: Record<string, string> = {}
) {
  const response = await fetch(
    `${BASE_URL}/${endpoint}?${new URLSearchParams(queries).toString()}`
  );
  return await response.json();
}
