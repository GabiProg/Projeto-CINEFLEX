import { useState } from "react";
import { Link } from "react-router-dom";

function Times({ name, id }) {
  return (
    <>
      <Link to={`/assentos/${id}`}>
        <div className="option">
          <h3>{name}</h3>
        </div>
      </Link>
    </>
  );
}

export default function TimeGallery(props) {

  const {hours} = props;
 
  return (
    <>
      {hours?.map((hour) => (
        <Times
          key={hour.id}
          showtimes={hour.id}
          name={hour.name}
          id={hour.id}
        />
      ))}
    </>
  );
}
