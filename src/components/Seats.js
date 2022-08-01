import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import Seat from "./Seat";
import "../styles/Reset.css";
import "../styles/Style_seats.css";

export default function Seats() {
  const { id } = useParams();

  const [chairs, setChairs] = useState(null);
  const [nome, setNome] = useState("");
	const [cpf, setCpf] = useState("");
  const [selectedSeats, setSelectedSeats] = useState(new Map());

  function AccessIdSeat(name, id){
    const selected = selectedSeats.has(id);
    if(selected){
      selectedSeats.delete(id);
      setSelectedSeats(new Map(selectedSeats));
    } else{
      setSelectedSeats(new Map(selectedSeats.set(id, name)));
      console.log(selectedSeats);
    }
  }

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${id}/seats`;

    const promise = axios.get(URL);

    promise.then((response) => {
      setChairs([...response.data.seats]);
    });
  }, []);

  function GetUserInformation(){
    const request = axios.post('', {
      ids: [...selectedSeats.keys()],
      name: nome,
      cpf: cpf   
    });
  }

  return (
    <>
      <div className="screen3">
        <div className="select-seats">
          <h2>Selecione o(s) assento(s)</h2>
        </div>
        <div className="seats-gallery">
          {chairs?.map((chair) => (
            <Seat
              key={chair.id}
              id={chair.id}
              name={chair.name}
              isAvailable={chair.isAvailable}
              Select={(id, name) => AccessIdSeat(id, name)}
            />
          ))}
        </div>
        <div className="box">
          <div className="selecionado">
            <div></div>
            <p>Selecionado</p>
          </div>
          <div className="disponivel">
            <div></div>
            <p>Disponível</p>
          </div>
          <div className="indisponivel">
            <div></div>
            <p>Indisponível</p>
          </div>
        </div>
        <form>
        <div className="nome-comprador">
          <label id="campoNome" for="campoNome">Nome do comprador:</label>
          <input type="text" id="campoNome" placeholder="Digite seu nome..." />
        </div>
        <div className="cpf-comprador">
          <label id="campoCPF" for="campoCPF">CPF do comprador:</label>
          <input type="text" id="campoCPF" placeholder="Digite seu CPF..." />
        </div>
        <button>
          <p>Reservar assento(s)</p>
        </button>
        </form>
      </div>
      {chairs !== null ? (
        <Footer
          name={chairs.title}
          key={chairs.id}
          id={chairs.id}
          day={chairs.weekday}
          data={chairs.date}
        />
      ) : (
        "loading..."
      )} 
    </>
  );
}
