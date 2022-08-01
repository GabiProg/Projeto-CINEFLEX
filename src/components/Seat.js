import { useState } from "react";

export default function Seat({ name, isAvailable, id, Select}) {
  const [click, setClick] = useState({});
  const [color, setColor] = useState("azul");
 

  function SeatSelect(name, id) {
    if (!isAvailable === true) {
      alert("Esse assento não está disponível");
    }
    if(isAvailable === true){
      setClick(true);
      setColor("verde");
      Select(name, id);
    }
    if(click === true){
      setClick(false);
      setColor("azul");
    } 
  }
      
  return (
    <>
      <div className={!isAvailable === true ? "amarelo" : `${color}`}
      onClick={() => SeatSelect(name, id)} >
          <h3>{name}</h3>
      </div>
    </>
  );
}

