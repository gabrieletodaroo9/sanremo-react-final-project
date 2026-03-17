import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ArtistPage() {
  const { id } = useParams()
  const [artist, setArtist] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/artists/${id}`)
    .then(res => setArtist(res.data.data))
    .catch(err => {
      if (err.response) {
        navigate("/404")
      }
    })
    }, [id, navigate])

  if (!artist) return <div className="container mt-5 text-center text-muted">Caricamento artista...</div>

  return (
    <div className="container mt-5 pt-4 pt-md-0 pb-5">
      <button onClick={() => navigate(-1)} className="btn border-0 mb-4 p-0 fs-3"><i className="bi bi-arrow-left"></i> Torna</button>

      <div className="row align-items-center mb-5 g-4">
        <div className="col-md-8 text-md-start text-center">
          <h1 className="fw-bold text-uppercase mb-0 text-first display-1">{artist.name}</h1>
          <span className="text-secondary text-uppercase fs-4">{artist.type}</span>
        </div>
        <div className="col-md-4 text-center">
          <img src={`http://127.0.0.1:8000/storage/${artist.img_url}`} alt={artist.name} className="img-fluid rounded-circle border shadow w-75" style={{ objectFit: "cover", aspectRatio: "1/1" }} />
        </div>
      </div>

      <div className="row g-5">
        <div className="col-12 col-md-6 mb-5">
          <h3 className="fw-bold text-uppercase text-first border-bottom border-secondary pb-2 mb-4">Biografia</h3>
          <p className="fs-5" style={{ lineHeight: "1.7", textAlign: "justify" }}>{artist.bio}</p>
        </div>

        <div className="col-12 col-md-6">
          <h3 className="fw-bold text-uppercase text-first border-bottom border-secondary pb-2 mb-4">Partecipazioni al Festival</h3>
          <div className="list-group list-group-flush">
            
            {artist.songs?.length > 0 ? artist.songs.map(song => (
              <div key={song.id} className="list-group-item bg-transparent px-0 py-4 border-bottom border-secondary">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="fw-bold text-first mb-1 d-block">Sanremo {song.edition.year}</span>
                    <Link to={`/songs/${song.id}`} className="text-decoration-none text-dark"><h4 className="fw-bold text-uppercase mb-0">{song.title}</h4></Link>
                  </div>
                  <div className="text-end"><h4 className="fw-bold text-first display-6">{song.position}°</h4></div>
                </div>
              </div>
            )) : <p className="text-muted">Nessuna partecipazione registrata.</p>}

          </div>
        </div>
      </div>
    </div>
  )
}