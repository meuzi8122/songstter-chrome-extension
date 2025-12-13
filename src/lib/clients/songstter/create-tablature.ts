import { UnauthorizedSongstterError } from "./error";

export async function createTablature(videoId: string, cookie: string) {
  const res = await fetch(
    "https://www.songsterr.com/api/song/transcribe-song",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      body: JSON.stringify({
        videoId,
      }),
    }
  );

  if (res.ok) {
    throw new UnauthorizedSongstterError();
  }
}
