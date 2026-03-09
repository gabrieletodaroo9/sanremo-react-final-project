import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function Header({ logo }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const location = useLocation();

  const isVideoPage = location.pathname === "/" || location.pathname === "/aboutus";

  const headerBg = isVideoPage 
    ? "bg-transparent position-absolute w-100 shadow-none" 
    : "bg-white shadow-sm fixed-top";
  
  const textColor = isVideoPage ? "text-white" : "text-dark";

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/songs")
      .then(res => {
        if (res.data.success) setAllSongs(res.data.data);
      })
      .catch(err => console.error("Errore fetch canzoni", err));
  }, []);

  const closeMenu = () => {
    const navbarCollapse = document.getElementById("navbarSanremo");
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      const toggler = document.querySelector(".navbar-toggler");
      if (toggler) toggler.click();
    }
  };

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
    <nav className={`navbar navbar-expand-md z-3 py-2 py-md-4 px-2 px-md-5 ${headerBg}`}>
      <div className="container-fluid p-0">
        <Link className="navbar-brand" to="/" onClick={closeMenu}>
          <img src={logo} alt="Logo Sanremo" style={{ height: "45px", width: "auto" }} />
        </Link>

        <button 
          className={`navbar-toggler border-0 shadow-none ${textColor}`} 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSanremo" 
          aria-controls="navbarSanremo" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list fs-1"></i>
        </button>

        <div className="collapse navbar-collapse px-2" id="navbarSanremo">
          <div className="navbar-nav ms-auto align-items-md-center text-uppercase fs-5">
            <Link to="/" className={`nav-link me-md-4 ${textColor}`} onClick={closeMenu}>Home</Link>
            <Link to="/aboutus" className={`nav-link me-md-4 ${textColor}`} onClick={closeMenu}>Su di noi</Link>

            <div className="position-relative d-flex align-items-center mt-3 mt-md-0">
              <input
                type="text"
                value={query}
                onChange={handleSearch}
                className={`search-input py-1 ps-3 pe-5 rounded-5 fs-6 border w-100
                  ${isVideoPage ? "text-white border-white input-video" : "text-dark border-secondary input-light"}`}
                placeholder="Cerca canzone..."
                style={{ 
                  backgroundColor: isVideoPage ? "rgba(255, 255, 255, 0.1)" : "#f8f9fa", 
                  outline: "none",
                  minWidth: "250px"
                }}
                autoComplete="off"
              />
              <i className={`bi bi-search position-absolute ${textColor}`} style={{ right: "15px", fontSize: "0.9rem" }}></i>

              {results.length > 0 && (
                <div 
                  className="position-absolute bg-light shadow border rounded-1 overflow-hidden z-3 px-1 py-1" 
                  style={{ top: "100%", left: 0, width: "100%", marginTop: "10px" }}
                >
                  {results.map(song => (
                    <Link 
                      key={song.id} 
                      to={`/songs/${song.id}`} 
                      className="d-block p-2 text-decoration-none border-bottom result-item text-dark"
                      onClick={() => { 
                        setResults([]); 
                        setQuery(""); 
                        closeMenu(); 
                      }}
                    >
                      <div className="fw-bold" style={{ fontSize: "0.9rem" }}>{song.title}</div>
                      <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                        {song.artists?.map(a => a.name).join(", ")}
                      </small>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}