import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import VideoHeader from "../components/VideoHeader";
import Header from "../components/Header";

export default function DefaultLayout() {
    const { pathname } = useLocation()
    const [isRed, setIsRed] = useState(false)
    const showVideo = ["/", "/aboutus"].includes(pathname)

    return (
        <div className={`min-vh-100 d-flex flex-column bebas-neue-regular ${isRed ? 'theme-red' : 'theme-blue'}`}>
            
            <Header logo={`/logo-sanremissimo${isRed ? '-red' : ''}.png`} />
            {showVideo && <VideoHeader />}

            <main className="flex-grow-1 py-2 py-md-4 bg-main">
                <div className="container"><Outlet /></div>
            </main>

            <footer className="bg-dark text-white text-center py-3 mt-auto border-top border-secondary">
                <div className="container d-flex justify-content-between align-items-center">
                    <button onClick={() => {setIsRed(!isRed);window.scrollTo({ top: 0, behavior: 'smooth' });}} className={`btn-theme-toggle text-white text-uppercase small rounded-5 d-flex align-items-center gap-2 ${isRed ? 'is-red' : 'is-blue'}`}>
                        <i className={`bi bi-palette-fill fs-6 ${isRed ? 'text-danger' : 'text-first'}`}></i>
                        <span>cambia tema</span>
                    </button>
                    <p className="mb-0 opacity-75 text-end text-sm-center">&copy; 2026 Sanremissimo. Tutti i diritti riservati.</p>
                </div>
            </footer>

        </div>
    )
}