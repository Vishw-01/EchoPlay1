import { useState, type FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { usePlaylists } from '../context/PlaylistContext';
import { Home, Search, Library, Plus, Upload as UploadIcon } from "lucide-react";
// ...


export default function Sidebar() {
  const { playlists, createPlaylist } = usePlaylists();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? 'active' : ''}`;

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    createPlaylist(name);
    setName('');
    setShowForm(false);
  };

  return (
    <div className="sidebar">
      <h1>🎵 EchoPlay</h1>
      <nav className="nav">
        <NavLink to="/" className={linkClass} end>
          <Home size={20} /> Home
        </NavLink>
        <NavLink to="/search" className={linkClass}>
          <Search size={20} /> Search
        </NavLink>
        <NavLink to="/library" className={linkClass}>
          <Library size={20} /> Your Library
        </NavLink>
        <NavLink to="/upload" className={linkClass}>
          <UploadIcon size={20} /> Upload
</NavLink>
      </nav>

      <div className="playlist-section">
        <div className="playlist-section-header">
          <p>Playlists</p>
          <button
            className="icon-btn small"
            onClick={() => setShowForm((s) => !s)}
            title="Create playlist"
          >
            <Plus size={16} />
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleCreate} className="new-playlist-form">
            <input
              type="text"
              autoFocus
              placeholder="Playlist name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="new-playlist-input"
            />
          </form>
        )}

        {playlists.map((p) => (
          <NavLink key={p.id} to={`/playlist/${p.id}`} className={linkClass}>
            {p.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
