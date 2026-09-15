import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Playlist } from "../types";
import { playlists as initialPlaylists } from "../data/songs";

type PlaylistContextType = {
  playlists: Playlist[];
  createPlaylist: (name: string) => void;
  addSongToPlaylist: (playlistId: string, songId: string | number) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string | number) => void;
  deletePlaylist: (playlistId: string) => void;
};

const PlaylistContext = createContext<PlaylistContextType | null>(null);
const STORAGE_KEY = "echoplay-playlists";

export function PlaylistProvider({ children }: { children: ReactNode }) {
  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialPlaylists;
      }
    }
    return initialPlaylists;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(playlists));
  }, [playlists]);

  const createPlaylist = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const newPlaylist: Playlist = {
      id: `p_${Date.now()}`,
      name: trimmed,
      songIds: [],
    };
    setPlaylists((prev) => [...prev, newPlaylist]);
  };

  const addSongToPlaylist = (playlistId: string, songId: string | number) => {
    setPlaylists((prev) =>
      prev.map((p) =>
        p.id === playlistId && !p.songIds.includes(songId)
          ? { ...p, songIds: [...p.songIds, songId] }
          : p
      )
    );
  };

  const removeSongFromPlaylist = (playlistId: string, songId: string | number) => {
    setPlaylists((prev) =>
      prev.map((p) =>
        p.id === playlistId
          ? { ...p, songIds: p.songIds.filter((id) => id !== songId) }
          : p
      )
    );
  };

  const deletePlaylist = (playlistId: string) => {
    setPlaylists((prev) => prev.filter((p) => p.id !== playlistId));
  };

  return (
    <PlaylistContext.Provider
      value={{ playlists, createPlaylist, addSongToPlaylist, removeSongFromPlaylist, deletePlaylist }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

export const usePlaylists = () => {
  const ctx = useContext(PlaylistContext);
  if (!ctx) throw new Error("usePlaylists must be used within PlaylistProvider");
  return ctx;
};