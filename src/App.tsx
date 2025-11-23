import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage }from "./pages/HomePage";
import { ZonaDeCaptura } from './pages/ZonaDeCaptura';
import { PokemonPage } from './pages/PokemonPage';
import { TeamPage } from './pages/TeamPage';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon" element={<PokemonPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/zona-de-captura" element={<ZonaDeCaptura />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
