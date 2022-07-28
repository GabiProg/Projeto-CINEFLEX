import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Reset.css";
import "../styles/Style_seats.css";

function Seat({name}){
    return(
    <>
        <div><h3>{name}</h3></div>
    </>);
}

export default function Seats(){

    const {id} = useParams();

    const [chairs, setChairs] = useState([]);

    useEffect(() => {
        const URL = `https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${id}/seats`;

        const promise = axios.get(URL);

        promise.then(response => {
            setChairs([...response.data.seats]);
        })
    }, [])

    return(
    <>
        <div className="screen3">
            <div className="select-seats"><h2>Selecione o(s) assento(s)</h2></div>
            <div className="seats-gallery">
                {chairs?.map(chair => <Seat key={chair.id} id={chair.id} name={chair.name} isAvailable={chair.isAvailable}/>)}
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
            <div className="nome-comprador">
                <p>Nome do comprador:</p>
                <input type="text" placeholder="Digite seu nome..."/>
            </div>
            <div className="cpf-comprador">
                <p>CPF do comprador:</p>
                <input type="text" placeholder="Digite seu CPF..."/>
            </div>
            <div className="button"><p>Reservar assento(s)</p></div>
        </div>
    </>
    );
}