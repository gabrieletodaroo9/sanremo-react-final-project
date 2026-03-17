import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="text-center py-5">
      
      <div style={{ padding: '20vh 0' }}> 
        <h1 className="display-1 fw-bold text-first">404</h1>
        <h2 className="mb-4 text-uppercase fw-bold">Pagina non trovata!</h2>
        <Link to="/" className="text-first fs-4 text-decoration-none">
          <i className="bi bi-arrow-left me-2"></i>
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}