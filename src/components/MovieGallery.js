import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Reset.css";
import "../styles/Style_gallery.css";

function Posters({ source, alt, id }) {
    return (
        <>
            <div className="filmBox">
                <Link to={`/sessoes/${id}`}>
                    <img src={source} alt={alt} />
                </Link>
            </div>
        </>
    );
}

export default function MovieGallery() {

    const [images, setImages] = useState(
        [
            {
                id: null,
                source: null,
                alt: null
            }
        ]);

    useEffect(() => {
        const URL = 'https://mock-api.driven.com.br/api/v5/cineflex/movies';

        const promise = axios.get(URL);

        promise.then(response => {
            setImages([...response.data]);
        });
    }, []);

    return (
        <div className="screen">
            <div className="select">
                <h2>Selecione o filme</h2>
            </div>
            <div className="gallery">
                {images.map(image => <Posters
                    key={image.id}
                    source={image.posterURL}
                    alt={image.title}
                    id={image.id} />)}
            </div>
        </div>
    );
}