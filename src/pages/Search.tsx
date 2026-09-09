import { useState } from 'react';
import { songs } from '../data/songs';
import TrackRow from '../components/TrackRow';

export default function Search() {
  const [query, setQuery] = useState('');

  const filtered = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="What do you want to listen to?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <div>
        {filtered.map((s, i) => (
          <TrackRow key={s.id} song={s} index={i} songList={filtered} />
        ))}
      </div>
    </div>
  );
}
