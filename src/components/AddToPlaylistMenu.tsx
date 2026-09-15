import { useState, useRef, useEffect } from "react";
import { Plus, Check } from "lucide-react";
import { usePlaylists } from "../context/PlaylistContext";

export default function AddToPlaylistMenu({ songId }: { songId: string | number }) {
  const { playlists, addSongToPlaylist } = usePlaylists();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="add-to-playlist" ref={ref}>
      <button
        className="icon-btn small"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        title="Add to playlist"
      >
        <Plus size={16} />
      </button>
      {open && (
        <div className="add-to-playlist-menu" onClick={(e) => e.stopPropagation()}>
          {playlists.length === 0 && <p className="add-to-playlist-empty">No playlists yet</p>}
          {playlists.map((p) => {
            const added = p.songIds.includes(songId);
            return (
              <button
                key={p.id}
                className="add-to-playlist-item"
                onClick={() => {
                  addSongToPlaylist(p.id, songId);
                  setOpen(false);
                }}
              >
                <span>{p.name}</span>
                {added && <Check size={14} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}