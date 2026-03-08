import { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomePage() {
    const [editions, setEditions] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/editions')
            .then(res => setEditions(res.data.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-4"><i className="bi bi-mic-fill"></i> Edizioni</h2>
            <div className="row g-4">
                {editions.map(ed => (
                    <div key={ed.id} className="col-md-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5>Sanremo {ed.year}</h5>
                                <p className="small text-muted">{ed.host}</p>
                                <button className="btn btn-primary">Dettagli</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}