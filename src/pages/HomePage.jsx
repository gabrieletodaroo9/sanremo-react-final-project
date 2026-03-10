import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [editions, setEditions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEditions(currentPage);
  }, [currentPage]);

  const fetchEditions = (page) => {
    if (loading) return;
    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/api/editions?page=${page}`)
      .then((res) => {
        const newData = res.data.data;
        setEditions((prev) => [...prev, ...newData]);
        setLastPage(res.data.last_page);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Errore:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentScroll = window.innerHeight + document.documentElement.scrollTop;

      if (currentScroll + 100 >= scrollHeight && !loading && currentPage < lastPage) {
        setCurrentPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, currentPage, lastPage]);

  return (
    <div className="container mt-4 pb-5">
      <h2 className="mb-5 text-center display-3 text-uppercase fw-bold">Edizioni</h2>

      <div className="row g-1 g-md-5">
        {editions.map((edition, index) => (
          <div key={`${edition.id}-${index}`} className="col-12 col-md-6 mb-4 animate-fade-in">
            <Link to={`/editions/${edition.id}`} className="text-decoration-none text-dark">
              <div className="card hover-card text-center h-100 border-0 rounded-5 py-3 px-5 shadow-sm">
                <div className="card-body d-flex flex-column align-items-center justify-content-center p-2 p-lg-4">
                  <div className="mb-0 d-flex align-items-center justify-content-center" style={{ height: "150px", width: "100%" }}>
                    {edition.logo_url && (
                      <img
                        src={`http://127.0.0.1:8000/storage/${edition.logo_url}`}
                        alt={`Logo ${edition.year}`}
                        className="img-fluid"
                        style={{ maxHeight: "100%", objectFit: "contain" }}
                      />
                    )}
                  </div>
                  <h3 className="fw-bold text-first mb-0">Sanremo {edition.year}</h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="spinner-grow text-dark" role="status"></div>
        </div>
      )}

    </div>
  );
}