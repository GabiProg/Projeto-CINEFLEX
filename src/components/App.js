import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import MovieGallery from "./MovieGallery";
import Sessions from "./Sessions";
import Seats from "./Seats";
import Success from "./Success";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieGallery />} />
          <Route path="/sessoes/:id" element={<Sessions />} />
          <Route path="/assentos/:id" element={<Seats />} />
          <Route path="/sucesso" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
