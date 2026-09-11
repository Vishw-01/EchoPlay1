export type Song = {
  id: string | number;
  title: string;
  artist: string;
  album: string;
  cover: string;
  src: string;
  duration: number;
};

export type Playlist = {
  id: string;
  name: string;
  songIds: number[];
};