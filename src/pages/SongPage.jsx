import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SongPage() {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/songs/${id}`)
      .then((res) => setSong(res.data.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!song) return <div className="container mt-5 text-center text-muted">Caricamento...</div>;

  return (
    <div className="container mt-1 pb-5">
      <button onClick={() => navigate(-1)} className="btn fs-3 border-0 mb-5 p-0 text-muted">
        <i className="bi bi-arrow-left"></i> Torna
      </button>

      <div className="row">
        <div className="col-md-5">
          <div className="sticky-top" style={{ top: "20px" }}>
            <h1 className="display-4 fw-bold text-uppercase mb-2">{song.title}</h1>
            
            <div className="mb-4">
              {song.artists.map((artist, index) => (
                <Link key={artist.id} to={`/artists/${artist.id}`} className="text-decoration-none">
                  <h3 className="text-first fw-bold mb-0">
                    {artist.name}{index < song.artists.length - 1 && " & "}
                  </h3>
                </Link>
              ))}
              <p className="text-muted small text-uppercase mt-2">
                Sanremo {song.edition.year} — {song.edition.location}
              </p>
            </div>

            <div className="mt-4 pt-3 border-top border-secondary">
              <p className="small text-muted text-uppercase fw-bold mb-1">Autori</p>
              <p className="mb-4">{song.collaborators}</p>
              
              {song.awards && song.awards.length > 0 && (
                <div className="d-flex flex-wrap">
                  {song.awards.map(award => (
                    <div key={award.id} className="badge bg-light text-first me-2 p-2 mb-2 shadow-sm">
                      <i className="bi bi-trophy-fill me-1"></i> {award.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-7 ps-md-5">
          
          {song.youtube_url && (
            <div className="ratio ratio-16x9 mb-5 shadow-sm rounded bg-dark overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${song.youtube_url.split('v=')[1]}`}
                title="YouTube Video"
                allowFullScreen
              ></iframe>
            </div>
          )}

          <h3 className="fw-bold text-uppercase mb-4 text-first tracking-widest ps-4">Testo</h3>
          <div 
            className="lyrics-display p-4 rounded bg-main" 
            style={{ 
              whiteSpace: "pre-line", 
              fontSize: "1.15rem", 
              lineHeight: "1.9",
              color: "#333"
            }}
          >
            {song.lyrics || "Testo in fase di aggiornamento..."}
          </div>
        </div>
      </div>
    </div>
  );
}