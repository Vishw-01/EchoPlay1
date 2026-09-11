import { useEffect, useState } from "react";
import type { Song } from "../types";
import { fetchSongs } from "../services/songService";
import TrackRow from "../components/TrackRow";

export default function Library() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSongs()
      .then(setSongs)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className="section-title">Your Library</h2>
      {loading && <p className="search-status">Loading...</p>}
      {!loading && songs.length === 0 && <p className="search-status">No songs yet — upload one!</p>}
      <div>
        {songs.map((s, i) => (
          <TrackRow key={s.id} song={s} index={i} songList={songs} />
        ))}
      </div>
    </div>
  );
}