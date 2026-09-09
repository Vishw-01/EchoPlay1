import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";

export default function PlayerBar() {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    playNext,
    playPrev,
    progress,
    seek,
    volume,
    setVolume,
  } = usePlayer();

  if (!currentSong) {
    return <div className="player-bar empty">No song playing</div>;
  }

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <div className="player-bar">
      <div className="player-left">
        <img src={currentSong.cover} alt="" />
        <div className="player-left-text">
          <p className="player-song-title">{currentSong.title}</p>
          <p className="player-song-artist">{currentSong.artist}</p>
        </div>
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button onClick={playPrev} className="icon-btn">
            <SkipBack size={20} />
          </button>
          <button onClick={togglePlay} className="play-btn">
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button onClick={playNext} className="icon-btn">
            <SkipForward size={20} />
          </button>
        </div>
        <div className="progress-row">
          <span className="time-text">{formatTime(progress)}</span>
          <input
            type="range"
            min={0}
            max={currentSong.duration}
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
          />
          <span className="time-text">{formatTime(currentSong.duration)}</span>
        </div>
      </div>

      <div className="player-right">
        <Volume2 size={18} />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>
    </div>
  );
}