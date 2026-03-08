import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function SongPage() {
  const { id } = useParams();
  const [song, setSong] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/songs/${id}`)
      .then((res) => setSong(res.data.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!song)
    return <div className="container mt-5 text-center text-muted">Caricamento canzone...</div>;

  return (
    <div className="container mt-5 pb-5">
      <Link to={-1} className="btn border-0 mb-4 p-0 fs-3">
        <i className="bi bi-arrow-left me-2"></i>Torna
      </Link>

      <div className="row g-5">
        <div className="col-md-5">
          <div className="sticky-top" style={{ top: '150px' }}>
            <h1 className="display-3 fw-bold text-uppercase mb-3 text-first">{song.title}</h1>
            
            <div className="mb-4">
              {song.artists.map((artist) => (
                <Link 
                  key={artist.id} 
                  to={`/artists/${artist.id}`} 
                  className="d-flex align-items-center text-decoration-none mb-3"
                >
                  <img 
                    src={`http://127.0.0.1:8000/storage/${artist.img_url}`} 
                    alt={artist.name} 
                    className="rounded-circle me-3"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                  <div>
                    <h4 className="mb-0 text-secondary fw-bold">{artist.name}</h4>
                  </div>
                </Link>
              ))}
            </div>

            <hr />
            
            <div className="mt-4">
              <p className="fs-4 text-first mb-1 text-uppercase fw-bold">Autori e Collaboratori</p>
              <p className="fs-5 text-dark">{song.collaborators}</p>
            </div>

            {song.awards.length > 0 && (
              <div className="mt-4">
                <p className="small text-first fs-4 mb-2 text-uppercase fw-bold">Riconoscimenti</p>
                {song.awards.map(award => (
                  <div key={award.id} className=" text-muted p-2 mb-2 d-block text-start fs-5">
                    <i className="bi bi-trophy-fill me-2"></i> {award.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="col-md-7 ps-md-5">
          <h1 className="fw-bold text-uppercase mb-4 text-first">Testo</h1>
          <div className="lyrics-container" style={{ whiteSpace: 'pre-line', fontSize: '1.6rem', lineHeight: '1.6' }}>
            {song.lyrics || "Testo non disponibile."}
          </div>
        </div>
      </div>
    </div>
  );
}