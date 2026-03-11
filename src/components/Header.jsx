import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function Header({ logo }) {

  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [allSongs, setAllSongs] = useState([])

  const { pathname } = useLocation()

  const isVideoPage = ["/", "/aboutus"].includes(pathname)
  const headerBg = isVideoPage ? "bg-transparent position-absolute w-100 shadow-none" : "bg-white shadow-sm fixed-top"
  const textColor = isVideoPage ? "text-white" : "text-dark"

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/songs")
    .then(res => setAllSongs(res.data.data))
    .catch(err => console.error(err))
  }, [])

  const closeMenu = () => {
    const collapse = document.getElementById("navbarSanremo")
    if (collapse?.classList.contains("show")) document.querySelector(".navbar-toggler")?.click()
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setQuery(value)
    setResults(value.trim().length > 1 ? allSongs.filter(song => song.title?.toLowerCase().includes(value.toLowerCase())).slice(0, 5) : []);
  };

  const clearSearch = () => { setResults([]); setQuery(""); closeMenu(); };

  return (

    <nav className={`navbar navbar-expand-md z-3 py-2 py-md-4 px-2 px-md-5 ${headerBg}`}>
      <div className="container-fluid p-0">
        
        <Link className="navbar-brand" to="/" onClick={closeMenu}>
          <img src={logo} alt="Logo" style={{ height: "45px", width: "auto" }} />
        </Link>
        
        <button className={`navbar-toggler border-0 shadow-none ${textColor}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSanremo">
          <i className="bi bi-list fs-1"></i>
        </button>
       
        <div className="collapse navbar-collapse px-2" id="navbarSanremo">
          
          <div className="navbar-nav ms-auto align-items-md-center text-uppercase fs-5">
           
            <Link to="/" className={`nav-link me-md-4 ${textColor}`} onClick={closeMenu}>Home</Link>
            <Link to="/aboutus" className={`nav-link me-md-4 ${textColor}`} onClick={closeMenu}>Su di noi</Link>
            <div className="position-relative d-flex align-items-center mt-3 mt-md-0">
              <input type="text" value={query} onChange={handleSearch} placeholder="Cerca canzone..." className={`search-input py-1 ps-3 pe-5 rounded-5 fs-6 border w-100 ${isVideoPage ? "text-white border-white input-video" : "text-dark border-secondary input-light"}`} style={{ backgroundColor: isVideoPage ? "rgba(255, 255, 255, 0.1)" : "#f8f9fa", outline: "none", minWidth: "250px" }} />
              <i className={`bi bi-search position-absolute ${textColor}`} style={{ right: "15px", fontSize: "0.9rem" }}></i>
              
              {results.length > 0 && (
                <div className="position-absolute bg-light shadow border rounded-1 overflow-hidden z-3 px-1 py-1" style={{ top: "100%", left: 0, width: "100%", marginTop: "10px" }}>
                  {results.map(s => (
                    <Link key={s.id} to={`/songs/${s.id}`} className="d-block p-2 text-decoration-none border-bottom text-dark" onClick={clearSearch}>
                      <div className="fw-bold" style={{ fontSize: "0.9rem" }}>{s.title}</div>
                      <small className="text-muted" style={{ fontSize: "0.75rem" }}>{s.artists?.map(a => a.name).join(", ")}</small>
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