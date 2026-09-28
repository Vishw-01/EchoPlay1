import { useEffect, useState } from "react";
import type { Song } from "../types";
import { fetchSongs, deleteSong, saveSongOrder } from "../services/songService";
import TrackRow from "../components/TrackRow";

export default function Library() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSongs()
      .then(setSongs)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string | number) => {
    const confirmed = window.confirm("Delete this song? This can't be undone.");
    if (!confirmed) return;
    try {
      await deleteSong(id);
      setSongs((prev) => prev.filter((s) => s.id !== id));
    } catch {
      alert("Failed to delete song.");
    }
  };

  const handleMove = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= songs.length) return;

    const reordered = [...songs];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    setSongs(reordered);

    try {
      await saveSongOrder(reordered);
    } catch {
      alert("Couldn't save the new order. Please try again.");
      fetchSongs().then(setSongs);
    }
  };

  return (
    <div>
      <h2 className="section-title">Your Library</h2>
      {loading && <p className="search-status">Loading...</p>}
      {!loading && songs.length === 0 && (
        <p className="search-status">No songs yet — upload one!</p>
      )}
      <div>
        {songs.map((s, i) => (
          <TrackRow
            key={s.id}
            song={s}
            index={i}
            songList={songs}
            onRemove={() => handleDelete(s.id)}
            onMoveUp={() => handleMove(i, -1)}
            onMoveDown={() => handleMove(i, 1)}
            isFirst={i === 0}
            isLast={i === songs.length - 1}
          />
        ))}
      </div>
    </div>
  );
}