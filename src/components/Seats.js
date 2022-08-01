import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import Seat from "./Seat";
import "../styles/Reset.css";
import "../styles/Style_seats.css";

export default function Seats(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const {dates, dadosDaCompra} = props;

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

  function GetUserInformation(e){
    e.preventDefault();
    
    const promise = axios.post('https://mock-api.driven.com.br/api/v7/cineflex/seats/book-many',{
      ids: [...selectedSeats.keys()],
      name: nome,
      cpf: cpf   
    });

    // const times = dates.filter((day) => day.weekday === day.weekday);
    // const datas = dates.filter((day) => day.date === day.date);

    promise.then((response) => {
      dadosDaCompra({
        ids: [...selectedSeats.keys()],
        name: nome,
        cpf: cpf,
        seat: selectedSeats,
        titulo: dates.title
      });
      navigate("/sucesso")
    })
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
        <form onSubmit={GetUserInformation}>
        <div className="nome-comprador">
          <label id="campoNome" for="campoNome">Nome do comprador:</label>
          <input type="text" id="campoNome" placeholder="Digite seu nome..." 
          value={nome} onChange={e => setNome(e.target.value)} required/>
        </div>
        <div className="cpf-comprador">
          <label id="campoCPF" for="campoCPF">CPF do comprador:</label>
          <input type="text" id="campoCPF" placeholder="Digite seu CPF..."
          value={cpf} onChange={e => setCpf(e.target.value)} required/>
        </div>
        <button type="submit">
          <p>Reservar assento(s)</p>
        </button>
        </form>
      </div>
      {dates ? (<Footer key={dates.id}
          src={dates.posterURL}
          alt={dates.title}
          name={dates.title}
          day={dates.weekday}
          data={dates.date}/>) : ('loading...')} 
    </>
  );
}
