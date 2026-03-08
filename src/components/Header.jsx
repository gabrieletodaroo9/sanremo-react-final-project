import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <>

            <header className="site-header d-flex justify-content-between align-items-center px-5 py-4">
                <div className="logo">
                    <Link to="/">
                        <img 
                            src="/logo-sanremissimo.png" 
                            alt="Logo Sanremo" 
                            style={{ height: '50px', width: 'auto' }} 
                        />
                    </Link>
                </div>

                <div className="d-flex align-items-center nav-links text-white text-uppercase fs-5">
                    <Link to="/" className='me-4'>Home</Link>
                    <Link to="/about">Su di noi</Link>
                    
                    <div className="ms-4 position-relative">
                        <input 
                            type="text" 
                            className="search-input py-1 px-4 text-white rounded-5 fs-6" 
                            placeholder="Cerca canzone..." 
                        />
                        <i className="bi bi-search position-absolute text-white" style={{ right: '15px', top: '6px', fontSize: '0.9rem' }}></i>
                    </div>
                </div>
            </header>
        </>
    )
}