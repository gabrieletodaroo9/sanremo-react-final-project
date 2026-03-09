import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function EditionPage() {
  const { id } = useParams();
  const [edition, setEdition] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/editions/${id}`)
      .then((res) => setEdition(res.data.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!edition)
    return (
      <div className="container mt-5 text-center text-muted">
        Caricamento in corso...
      </div>
    );

  return (
    <div className="container mt-1">
      <Link to="/" className="btn border-0 mb-5 p-0 fs-3">
        <i className="bi bi-arrow-left"></i> Torna
      </Link>

      <div className="row align-items-center mb-5">
        <div className="col-md-4 text-center">
          <img
            src={`http://127.0.0.1:8000/storage/${edition.logo_url}`}
            alt={edition.year}
            className="img-fluid"
            style={{ maxHeight: "250px", objectFit: "contain" }}
          />
        </div>
        <div className="col-md-8 text-md-end text-center mt-3 mt-md-5">
          <h1 className="display-4 fw-bold text-first">
            Festival di Sanremo {edition.year}
          </h1>

          <div className="mt-3">
            <p className="fs-5 mb-1">
              Direzione Artistica: <strong>{edition.host}</strong>
              <i className="bi bi-mic-fill ms-2 text-first"></i>
            </p>
            <p className="text-muted mb-1">
              Co-conduzione: {edition.co_hosts}
              <i className="bi bi-people-fill ms-2 text-first"></i>
            </p>
            <p className="text-first bg-light small badge">
              Sede: {edition.location}
              <i className="bi bi-geo-alt-fill ms-2 text-first"></i>
            </p>
          </div>
        </div>
      </div>

      <hr />

      <div className="mt-5">
        <h3 className="fw-bold mb-4 text-uppercase text-center display-5 pb-2">
          Classifica e Canzoni
        </h3>
        <div className="row g-2">
          {edition.songs.map((song) => (
            <div key={song.id} className="col-12">
              <div className="card border-0 bg-transparent">
                <div className="card-body px-0 pt-0">
                  <div className="row align-items-center">
                    <div className="col-md-1 text">
                      <h3 className="fw-bold text-first mb-0">
                        {song.position}°
                      </h3>
                    </div>

                    <div className="col-md-5">
                      <Link 
                        to={`/songs/${song.id}`} 
                        className="text-decoration-none text-dark"
                      >
                        <h4 className="fw-bold mb-1 text-uppercase">
                          {song.title}
                        </h4>
                      </Link>

                      <p className="text-first fw-bold fs-5 mb-2">
                        {song.artists.map((artist, index) => (
                          <span key={artist.id}>
                            <Link 
                              to={`/artists/${artist.id}`} 
                              className="text-decoration-none text-first"
                            >
                              {artist.name}
                            </Link>
                            {index < song.artists.length - 1 && " & "}
                          </span>
                        ))}
                      </p>

                      <p className="small text-muted mb-0">
                        Autori: {song.collaborators}
                      </p>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-2 text-end">
                        {song.awards.map((award) => (
                          <span
                            key={award.id}
                            className="badge bg-light text-first me-2"
                          >
                            <i className="bi bi-trophy-fill me-1"></i>{" "}
                            {award.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <hr className="mb-0" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}