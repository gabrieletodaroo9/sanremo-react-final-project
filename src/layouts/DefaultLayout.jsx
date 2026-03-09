import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import VideoHeader from "../components/VideoHeader";
import Header from "../components/Header";

export default function DefaultLayout() {
    const location = useLocation();
    
    const [isRedTheme, setIsRedTheme] = useState(true);

    const showVideo = location.pathname === "/" || location.pathname === "/aboutus";

    const toggleTheme = () => setIsRedTheme(!isRedTheme);

    return (
        <div className={`min-vh-100 d-flex flex-column bebas-neue-regular ${isRedTheme ? 'theme-red' : 'theme-blue'}`}>
            
            <Header logo={isRedTheme ? "/logo-sanremissimo-red.png" : "/logo-sanremissimo.png"} />
            
            {showVideo && <VideoHeader />}
            
            <main className="flex-grow-1 py-2 py-md-4 bg-main">
                <div className="container">
                    <Outlet />
                </div>
            </main>
            
           <footer className="bg-dark text-white text-center py-3 mt-auto border-top border-secondary">
    <div className="container d-flex justify-content-between align-items-center">
        <button 
            onClick={toggleTheme} 
            className={`btn-theme-toggle d-flex align-items-center gap-2 ${isRedTheme ? 'is-red' : 'is-blue'}`}
        >
            <i className={`bi ${isRedTheme ? 'bi-palette-fill text-danger' : 'bi-palette-fill text-first'} fs-5`}></i>
            <span>cambia tema</span>
        </button> 
        <p className="mb-0 opacity-75 text-end text-sm-center">&copy; 2026 Sanremissimo. Tutti i diritti riservati.</p>
    </div>
</footer>
        </div>
    );
}