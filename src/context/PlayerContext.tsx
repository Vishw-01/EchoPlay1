import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Song } from "../types";

type PlayerContextType = {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  setVolume: (v: number) => void;
  playSong: (song: Song, songList?: Song[]) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrev: () => void;
  seek: (time: number) => void;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef(new Audio());
  const [queue, setQueue] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const currentSong = queue[currentIndex] || null;

  useEffect(() => {
    const audio = audioRef.current;
    if (currentSong) {
      audio.src = currentSong.src;
      if (isPlaying) audio.play();
    }
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onEnded = () => playNext();
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [queue, currentIndex]);

  const playSong = (song: Song, songList: Song[] = [song]) => {
    const idx = songList.findIndex((s) => s.id === song.id);
    setQueue(songList);
    setCurrentIndex(idx === -1 ? 0 : idx);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying((p) => !p);

  const playNext = () => {
    if (queue.length === 0) return;
    setCurrentIndex((i) => (i + 1) % queue.length);
    setIsPlaying(true);
  };

  const playPrev = () => {
    if (queue.length === 0) return;
    setCurrentIndex((i) => (i - 1 + queue.length) % queue.length);
    setIsPlaying(true);
  };

  const seek = (time: number) => {
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        progress,
        volume,
        setVolume,
        playSong,
        togglePlay,
        playNext,
        playPrev,
        seek,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
};