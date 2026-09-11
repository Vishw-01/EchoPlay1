import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { uploadSong } from "../services/songService";

export default function Upload() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAudioFile(file);
    setDuration(null);
    if (file) {
      const audio = new Audio(URL.createObjectURL(file));
      audio.addEventListener("loadedmetadata", () => {
        setDuration(Math.floor(audio.duration));
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!audioFile || !title.trim() || !artist.trim()) {
      setError("Title, artist, and an audio file are required.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await uploadSong({
        title,
        artist,
        album: album || "Single",
        audioFile,
        coverFile,
        duration: duration || 0,
      });
      navigate("/library");
    } catch (err: any) {
      setError(err.message || "Upload failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="upload-page">
      <h2 className="section-title">Upload a song</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <label className="upload-label">
          Song title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="upload-input"
            required
          />
        </label>

        <label className="upload-label">
          Artist
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="upload-input"
            required
          />
        </label>

        <label className="upload-label">
          Album (optional)
          <input
            type="text"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            className="upload-input"
          />
        </label>

        <label className="upload-label">
          Audio file (mp3)
          <input type="file" accept="audio/*" onChange={handleAudioChange} className="upload-file-input" required />
        </label>
        {duration !== null && (
          <p className="upload-hint">Detected length: {Math.floor(duration / 60)}:{String(duration % 60).padStart(2, "0")}</p>
        )}

        <label className="upload-label">
          Cover image (optional)
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
            className="upload-file-input"
          />
        </label>

        {error && <p className="upload-error">{error}</p>}

        <button type="submit" disabled={submitting} className="upload-submit-btn">
          {submitting ? "Uploading..." : "Upload Song"}
        </button>
      </form>
    </div>
  );
}