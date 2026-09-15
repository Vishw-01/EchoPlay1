import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import PlayerBar from "./components/PlayerBar";
import { PlayerProvider } from "./context/PlayerContext";
import { PlaylistProvider } from "./context/PlaylistContext";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Playlist from "./pages/Playlist";
import Upload from "./pages/Upload";

export default function App() {
  return (
    <PlaylistProvider>
      <PlayerProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <div className="app">
            <div className="main-row">
              <Sidebar />
              <main className="content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/playlist/:id" element={<Playlist />} />
                  <Route path="/upload" element={<Upload />} />
                </Routes>
              </main>
            </div>
            <PlayerBar />
          </div>
        </BrowserRouter>
      </PlayerProvider>
    </PlaylistProvider>
  );
}