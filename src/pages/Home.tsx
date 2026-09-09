import { Play, Pause } from "lucide-react";
import { songs } from "../data/songs";
import { usePlaylists } from "../context/PlaylistContext";
import { usePlayer } from "../context/PlayerContext";
import Card from "../components/Card";

export default function Home() {
  const { playlists } = usePlaylists();
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();

  return (
    <div>
      <h2 className="section-title">Good afternoon</h2>
      <div className="card-grid">
        {songs.map((s) => {
          const isCurrent = currentSong?.id === s.id;
          return (
            <div
              key={s.id}
              className="card song-card"
              onClick={() => (isCurrent ? togglePlay() : playSong(s, songs))}
            >
              <div className="song-card-image-wrap">
                <img src={s.cover} alt={s.title} />
                <div className="song-card-play-overlay">
                  {isCurrent && isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </div>
              </div>
              <p className="card-title">{s.title}</p>
              <p className="card-subtitle">{s.artist}</p>
            </div>
          );
        })}
      </div>

      <h2 className="section-title">Your Playlists</h2>
      <div className="card-grid">
        {playlists.map((p) => (
          <Card
            key={p.id}
            image={
              songs.find((s) => s.id === p.songIds[0])?.cover ||
              `https://placehold.co/300x300/282828/808080?text=${encodeURIComponent(p.name)}`
            }
            title={p.name}
            subtitle={`${p.songIds.length} songs`}
            to={`/playlist/${p.id}`}
          />
        ))}
      </div>
    </div>
  );
}