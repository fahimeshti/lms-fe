// Lecture videos can be a YouTube link or a direct video file URL (.mp4,
// .webm, .m3u8 ...). The player (Vidstack) understands both, but not every
// YouTube link format, so YouTube links are normalised to "youtube/<id>".

const YOUTUBE_ID = /^[\w-]{11}$/;

export function getYouTubeId(url: string): string | null {
  let u: URL;
  try {
    u = new URL(url.trim());
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^(www|m|music)\./, "");
  let id: string | null = null;

  if (host === "youtu.be") {
    id = u.pathname.slice(1).split("/")[0];
  } else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    if (u.pathname === "/watch") id = u.searchParams.get("v");
    else {
      // /embed/ID, /shorts/ID, /live/ID, /v/ID
      const m = u.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?#]+)/);
      id = m?.[1] ?? null;
    }
  }
  return id && YOUTUBE_ID.test(id) ? id : null;
}

export function toPlayerSrc(url?: string | null): string | null {
  if (!url?.trim()) return null;
  const youtubeId = getYouTubeId(url);
  return youtubeId ? `youtube/${youtubeId}` : url.trim();
}
