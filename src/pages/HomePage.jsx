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
              <div className="card hover-card text-center h-100 border-0 rounded-circle py-3 px-5">
                <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
                  <div
                    className="mb-0 d-flex align-items-center justify-content-center"
                    style={{ height: "150px", width: "100%" }}
                  >
                    {edition.logo_url && (
                      <img
                        src={`http://127.0.0.1:8000/storage/${edition.logo_url}`}
                        alt={`Logo ${edition.year}`}
                        className="img-fluid"
                        style={{ maxHeight: "100%", objectFit: "contain" }}
                      />
                    )}
                  </div>

                  <h3 className="fw-bold text-first mb-0">
                    Sanremo {edition.year}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
