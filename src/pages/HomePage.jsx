import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [editions, setEditions] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/editions")
      .then((res) => setEditions(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center display-3"> Edizioni</h2>
      <div className="row g-5">
        {editions.map((edition) => (
          <div key={edition.id} className="col-6 col-md-4 mb-4">
            <Link
              to={`/editions/${edition.id}`}
              className="text-decoration-none text-dark"
            >
              <div className="card border-0 bg-transparent text-center h-100 hover-card">
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <div className=" mb-3">
                    {edition.logo_url &&
                      <img src={`http://127.0.0.1:8000/storage/${edition.logo_url}`} alt={`Logo ${edition.year}`} className="img-fluid logo-img p-5"/>
                    }
                  </div>
                  <h4 className="fw-bold text-first mb-1">Sanremo {edition.year}</h4>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
