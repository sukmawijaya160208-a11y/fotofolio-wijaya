/**
 * Section 07-B — FOCUS MIX playlist.
 * Track ID Spotify asli (embed beneran jalan). Ganti dengan track favorit
 * di file ini — cukup ganti Spotify track ID-nya.
 */
export type MixTrack = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  hue: number;
};

export const mixTracks: MixTrack[] = [
  { id: "5L2ELXkO17Iu9J8hwMktVJ", title: "Helaf El Amar", artist: "George Wassouf", album: "El Hawa Sultan", duration: "6:40", hue: 8 },
  { id: "2Z8WuEywRWYTKe1NybPQEW", title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:23", hue: 265 },
  { id: "02MWAaffLxlfxAUY7c5dvx", title: "Heat Waves", artist: "Glass Animals", album: "Dreamland", duration: "3:58", hue: 160 },
  { id: "4ZtFanR9U6ndgddUvNcjcG", title: "good 4 u", artist: "Olivia Rodrigo", album: "SOUR", duration: "2:58", hue: 315 },
];

export const spotifyEmbed = (id: string) =>
  `https://open.spotify.com/embed/track/${id}?utm_source=generator`;
export const spotifyUrl = (id: string) => `https://open.spotify.com/track/${id}`;
