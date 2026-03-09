import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function Header({ logo }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [allSongs, setAllSongs] = useState([]); 

  const location = useLocation();

  const isVideoPage =
    location.pathname === "/" || location.pathname === "/aboutus";

  const headerBg = isVideoPage
    ? "bg-transparent position-absolute w-100"
    : "bg-white shadow";
  const textColor = isVideoPage ? "text-white" : "text-dark";

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/songs")
      .then(res => {
        if (res.data.success) setAllSongs(res.data.data);
      })
      .catch(err => console.error("Errore fetch canzoni", err));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 1) {
      const filtered = allSongs.filter(s => 
        s.title?.toLowerCase().includes(value.toLowerCase()) || 
        s.artists?.some(a => a.name.toLowerCase().includes(value.toLowerCase()))
      ).slice(0, 5);
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <header
      className={`site-header d-flex justify-content-between align-items-center px-5 py-4 z-3 ${headerBg}`}
    >
      <div className="logo">
        <Link to="/">
          <img
            src={logo}
            alt="Logo Sanremo"
            style={{ height: "50px", width: "auto" }}
          />
        </Link>
      </div>

      <div
        className={`d-flex align-items-center nav-links text-uppercase fs-5`}
      >
        <Link to="/" className={`me-4 text-decoration-none ${textColor}`}>
          Home
        </Link>
        <Link to="/aboutus" className={`text-decoration-none ${textColor}`}>
          Su di noi
        </Link>

        <div className="ms-4 position-relative d-flex align-items-center">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            className={`search-input py-1 ps-3 pe-5 rounded-5 fs-6 border 
        ${isVideoPage ? "text-white border-white input-video" : "text-dark border-secondary input-light"}`}
            placeholder="Cerca canzone..."
            style={{
              backgroundColor: isVideoPage
                ? "rgba(255, 255, 255, 0.1)"
                : "#f8f9fa",
              outline: "none",
            }}
            autoComplete="off"
          />
          <i
            className={`bi bi-search position-absolute ${textColor}`}
            style={{ right: "15px", fontSize: "0.9rem" }}
          ></i>

          {results.length > 0 && (
            <div 
              className="position-absolute bg-light shadow border rounded-1 overflow-hidden z-3 px-1 py-1" 
              style={{ top: "100%", left: 0, width: "100%", marginTop: "10px" }}
            >
              {results.map(song => (
                <Link 
                  key={song.id} 
                  to={`/songs/${song.id}`} 
                  className="d-block p-2 text-decoration-none border-bottom border-muted result-item text-first"
                  onClick={() => { setResults([]); setQuery(""); }}
                >
                  <div className="fw-bold" style={{ fontSize: "0.9rem" }}>{song.title}</div>
                  <small className="text-muted fw-semibold" style={{ fontSize: "0.75rem" }}>
                    {song.artists?.map(a => a.name).join(", ")}
                  </small>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}