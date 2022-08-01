import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./Navbar";
import MovieGallery from "./MovieGallery";
import Sessions from "./Sessions";
import Seats from "./Seats";
import Success from "./Success";

export default function App() {

  const [dates, setDates] = useState();
  const [dados, setDados] = useState();

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieGallery />} />
          <Route path="/sessoes/:id" element={<Sessions dates={dates} setDates={setDates}/>} />
          <Route path="/assentos/:id" element={<Seats dates={dates} dadosDaCompra={
            (dados) => setDados(dados)}/>} />
          <Route path="/sucesso" element={<Success dados={dados}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
