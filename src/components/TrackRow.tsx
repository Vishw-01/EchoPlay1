import { Play, Pause, X, ChevronUp, ChevronDown } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";
import type { Song } from "../types";
import AddToPlaylistMenu from "./AddToPlaylistMenu";

export default function TrackRow({
  song,
  index,
  songList,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: {
  song: Song;
  index: number;
  songList: Song[];
  onRemove?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}) {
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();
  const isCurrent = currentSong?.id === song.id;

  const handleClick = () => {
    if (isCurrent) togglePlay();
    else playSong(song, songList);
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <div onClick={handleClick} className={`track-row ${isCurrent ? "active" : ""}`}>
      <div className="track-index">
        {isCurrent && isPlaying ? (
          <Pause size={16} />
        ) : (
          <>
            <span className="track-index-number">{index + 1}</span>
            <Play size={16} className="track-play-icon" />
          </>
        )}
      </div>
      <div className="track-info">
        <img src={song.cover} alt="" />
        <div className="track-text">
          <p className="track-title">{song.title}</p>
          <p className="track-artist">{song.artist}</p>
        </div>
      </div>
      <div className="track-actions" onClick={(e) => e.stopPropagation()}>
        {onMoveUp && onMoveDown && (
          <>
            <button
              className="icon-btn small"
              onClick={onMoveUp}
              disabled={isFirst}
              title="Move up"
            >
              <ChevronUp size={18} />
            </button>
            <button
              className="icon-btn small"
              onClick={onMoveDown}
              disabled={isLast}
              title="Move down"
            >
              <ChevronDown size={18} />
            </button>
          </>
        )}
        <AddToPlaylistMenu songId={song.id} />
        {onRemove && (
          <button className="icon-btn small" onClick={onRemove} title="Remove">
            <X size={16} />
          </button>
        )}
      </div>
      <span className="track-duration">{formatTime(song.duration)}</span>
    </div>
  );
}