import { supabase } from "./supabase";
import type { Song } from "../types";

export async function fetchSongs(): Promise<Song[]> {
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data || []).map((row: any) => ({
    id: row.id,
    title: row.title,
    artist: row.artist,
    album: row.album,
    cover: row.cover_url,
    src: row.audio_url,
    duration: row.duration,
  }));
}

export async function uploadSong({
  title,
  artist,
  album,
  audioFile,
  coverFile,
  duration,
}: {
  title: string;
  artist: string;
  album: string;
  audioFile: File;
  coverFile: File | null;
  duration: number;
}): Promise<Song> {
  const timestamp = Date.now();
  const audioPath = `${timestamp}-${audioFile.name}`;

  const { error: audioError } = await supabase.storage
    .from("songs")
    .upload(audioPath, audioFile);
  if (audioError) throw audioError;

  const {
    data: { publicUrl: audioUrl },
  } = supabase.storage.from("songs").getPublicUrl(audioPath);

  let coverUrl = "";
  if (coverFile) {
    const coverPath = `${timestamp}-${coverFile.name}`;
    const { error: coverError } = await supabase.storage
      .from("covers")
      .upload(coverPath, coverFile);
    if (coverError) throw coverError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("covers").getPublicUrl(coverPath);
    coverUrl = publicUrl;
  } else {
    coverUrl = `https://placehold.co/300x300/282828/808080?text=${encodeURIComponent(title)}`;
  }

  const { data, error } = await supabase
    .from("songs")
    .insert({
      title,
      artist,
      album,
      audio_url: audioUrl,
      cover_url: coverUrl,
      duration,
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    title: data.title,
    artist: data.artist,
    album: data.album,
    cover: data.cover_url,
    src: data.audio_url,
    duration: data.duration,
  };
}
export async function deleteSong(id: string | number): Promise<void> {
  const { error } = await supabase.from("songs").delete().eq("id", id);
  if (error) throw error;
}