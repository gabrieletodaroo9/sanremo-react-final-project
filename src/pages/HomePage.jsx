import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [editions, setEditions] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    axios.get(`http://127.0.0.1:8000/api/editions?page=${page}`)
      .then(res => {
        setEditions([...editions, ...res.data.data])
        setLastPage(res.data.last_page)
        setLoading(false)
      })}, [page])

  return (
    <div className="container mt-4 pb-5">
      <h2 className="mb-5 text-center display-3 text-uppercase fw-bold">Edizioni</h2>
      
      <div className="row g-1 g-md-5">
        {editions.map((edition) => (
          <div key={`${edition.id}`} className="col-12 col-md-6 mb-4">
            <Link to={`/editions/${edition.id}`} className="text-decoration-none text-dark">
              <div className="card hover-card text-center h-100 border-0 rounded-5 py-3 px-5 shadow-sm">
                <div className="card-body d-flex flex-column align-items-center justify-content-center p-2 p-lg-4">
                  <div className="mb-0 d-flex align-items-center justify-content-center" style={{ height: "150px", width: "100%" }}>
                    {edition.logo_url && <img src={`http://127.0.0.1:8000/storage/${edition.logo_url}`} alt={edition.year} className="img-fluid" style={{ maxHeight: "100%", objectFit: "contain" }} />}
                  </div>
                  <h3 className="fw-bold text-first mb-0">Sanremo {edition.year}</h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {page < lastPage && (
        <div className="text-center mt-5">
          <button onClick={() => setPage(page + 1)} className="btn btn-link text-dark text-decoration-none p-0">
             <i className="bi bi-chevron-double-down fs-1 animate-bounce text-first"></i>
             <div className="text-uppercase small text-first fw-bold">Visualizza altre</div>
          </button>
        </div>
      )}

      {loading && <div className="text-center py-4"><div className="spinner-grow text-dark"></div></div>}
    </div>
  )
}