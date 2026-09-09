import { songs } from "../data/songs";
import TrackRow from "../components/TrackRow";

export default function Library() {
  return (
    <div>
      <h2 className="section-title">Your Library</h2>
      <div>
        {songs.map((s, i) => (
          <TrackRow key={s.id} song={s} index={i} songList={songs} />
        ))}
      </div>
    </div>
  );
}