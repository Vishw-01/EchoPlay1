import type { Song, Playlist } from '../types';

export const songs: Song[] = [
  {
    id: 1,
    title: 'Midnight Drive',
    artist: 'Neon Skyline',
    album: 'Night City',
    cover: 'https://placehold.co/300x300/1DB954/000000?text=Midnight+Drive',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 236,
  },
  {
    id: 2,
    title: 'Golden Hour',
    artist: 'Wave Theory',
    album: 'Sunset Sessions',
    cover: 'https://placehold.co/300x300/E67E22/000000?text=Golden+Hour',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 198,
  },
  {
    id: 3,
    title: 'Static Bloom',
    artist: 'Echo Room',
    album: 'Frequencies',
    cover: 'https://placehold.co/300x300/9B59B6/000000?text=Static+Bloom',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 212,
  },
  {
    id: 4,
    title: 'Paper Planets',
    artist: 'Neon Skyline',
    album: 'Night City',
    cover: 'https://placehold.co/300x300/3498DB/000000?text=Paper+Planets',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    duration: 250,
  },
];

export const playlists: Playlist[] = [
  { id: 'p1', name: 'Chill Vibes', songIds: [1, 2, 3] },
  { id: 'p2', name: 'Late Night', songIds: [1, 4] },
];
