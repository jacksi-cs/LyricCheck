import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Navigation } from "./components/Navigation";
import { FooterContainer } from "./components/Footer";
import About from "./components/About";
import AboutLyricCheck from "./components/AboutLyricCheck";
import OurD3Visuals from "./components/OurD3Visuals";
import TheirD3Visuals from "./components/TheirD3Visuals";

import "./App.css";
import Song from "./components/Song";
import Artist from "./components/Artist";
import Country from "./components/Country";
import SongRankings from "./components/ranking-pages/SongRankings";
import ArtistRankings from "./components/ranking-pages/ArtistRankings";
import CountryRankings from "./components/ranking-pages/CountryRankings";
import Search from "./components/Search"

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="song" element={<SongRankings />}></Route>
        <Route path="artist" element={<ArtistRankings />}></Route>
        <Route path="country" element={<CountryRankings />}></Route>

        <Route path="aboutlyriccheck" element={<AboutLyricCheck />}></Route>
        <Route path="ourd3visuals" element={<OurD3Visuals />}></Route>
        <Route path="theird3visuals" element={<TheirD3Visuals />}></Route>

        <Route path="search" element={<Search />}></Route>

        <Route path="song/:id" element={<Song />}></Route>
        <Route path="country/:id" element={<Country />}></Route>
        <Route path="artist/:id" element={<Artist />}></Route>
      </Routes>
      <FooterContainer />
    </>
  );
}

export default App;
