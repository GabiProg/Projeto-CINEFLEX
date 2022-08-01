import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TimeGallery from "./TimeGallery";
import Footer from "./Footer";
import "../styles/Reset.css";
import "../styles/Style_session.css";

function DatesGallery({ day, data, showtimes, id }) {
  return (
    <>
      <div>
        <h3>
          {day} - {data}
        </h3>
      </div>
      <div className="hourGallery">
        <TimeGallery showtimes={showtimes} id={id} />
      </div>
    </>
  );
}

export default function Sessions() {
  const { id } = useParams();

  const [dates, setDates] = useState();

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v5/cineflex/movies/${id}/showtimes`;

    const promise = axios.get(URL);

    promise.then((response) => {
      setDates(response.data);
    });
  }, []);

  return (
    <>
      <div className="sreen2">
        <div className="selectSession">
          <h2>Selecione o horário</h2>
        </div>
        <div className="session-gallery">
          <div className="date-gallery">
            {dates?.days.map((date) => (
              <DatesGallery
                key={date.id}
                id={date.id}
                day={date.weekday}
                data={date.date}
                showtimes={date.showtimes}
              />
            ))}
          </div>
        </div>
      </div>
      {dates ? (
        <Footer
          key={dates.id}
          src={dates.posterURL}
          alt={dates.title}
          name={dates.title}
        />
      ) : (
        "loading..."
      )}
    </>
  );
}
