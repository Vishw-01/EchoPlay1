import { useParams } from "react-router-dom";
import { songs } from "../data/songs";
import { usePlaylists } from "../context/PlaylistContext";
import TrackRow from "../components/TrackRow";

export default function Playlist() {
  const { id } = useParams();
  const { playlists, removeSongFromPlaylist } = usePlaylists();
  const playlist = playlists.find((p) => p.id === id);
  const playlistSongs = songs.filter((s) => playlist?.songIds.includes(s.id));

  if (!playlist) return <div>Playlist not found</div>;

  return (
    <div>
      <div className="playlist-header">
        <img
          src={playlistSongs[0]?.cover || "https://placehold.co/300x300/282828/808080?text=Playlist"}
          alt=""
        />
        <div>
          <p className="playlist-label">Playlist</p>
          <h1>{playlist.name}</h1>
          <p className="playlist-count">{playlistSongs.length} songs</p>
        </div>
      </div>
      <div>
        {playlistSongs.length === 0 && (
          <p className="empty-playlist-msg">No songs yet — add some from Search or Your Library.</p>
        )}
        {playlistSongs.map((s, i) => (
          <TrackRow
            key={s.id}
            song={s}
            index={i}
            songList={playlistSongs}
            onRemove={() => removeSongFromPlaylist(playlist.id, s.id)}
          />
        ))}
      </div>
    </div>
  );
}