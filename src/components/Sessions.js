import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TimeGallery from "./TimeGallery";
import Footer from "./Footer";
import "../styles/Reset.css";
import "../styles/Style_session.css";

function DatesGallery(props) {

  const { day, data, showtimes, id} = props;
  console.log(day, data, showtimes, id);

  const [hours, setHours] = useState(showtimes, id);
 
  return (
    <>
      <div>
        <h3>
          {day} - {data}
        </h3>
      </div>
      <div className="hourGallery">
        <TimeGallery showtimes={showtimes} id={id} hours={hours}/>
      </div>
    </>
  );
}

export default function Sessions(props) {
  const { id } = useParams();

  const {dates, setDates} = props;

 
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
      {dates? (
        <Footer
          key={dates.id}
          src={dates.posterURL}
          alt={dates.title}
          name={dates.title}
          day={dates.weekday}
          data={dates.date}
        />
      ) : (
        "loading..."
      )}
    </>
  );
}
