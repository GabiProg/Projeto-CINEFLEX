import "../styles/Reset.css";
import "../styles/Style_footer.css";

export default function Footer({ src, alt, name, data, day }) {
  
  return (
    <div className="footer">
      <div className="flex">
        <div className="box-image">
          <img src={src} alt={alt} />
        </div>
        <div className="title-time">
          <h4>{name}</h4>
          <p>
            {day} - {data}
          </p>
        </div>
      </div>
    </div>
  );
}
