import { useNavigate } from "react-router-dom";
import "../styles/Reset.css";
import "../styles/Style_successs.css";

export default function Success(props) {
  const { dados } = props;
  const { name, cpf, seat, titulo, datas, times } = dados;
  const navigate = useNavigate();

  console.log(dados);
  const seatName = [...seat.values()];

  return (
    <>
      <div className="screenSucesso">
        <h2>Pedido feito com sucesso!</h2>
      </div>
      <div className="quadro1">
        <h1>Filme e sessão</h1>
        <p>{titulo}</p>
        <p>{datas} - {times}</p>
      </div>
      <div className="quadro2">
        <h3>Ingressos</h3>
        {seatName.map((seats) => (
          <p key={seats}>Assento {seats}</p>
        ))}
      </div>
      <div className="quadro3">
        <h4>Comprador</h4>
        <p>Nome: {name}</p>
        <p>CPF: {cpf}</p>
      </div>
      <button onClick={() => navigate("/")}>Voltar pra Home</button>
    </>
  );
}
