import { Outlet } from "react-router-dom";
import VideoHeader from "../components/VideoHeader";
import Header from "../components/Header";

export default function DefaultLayout() {
    return (
        <div className="min-vh-100 d-flex flex-column bebas-neue-regular">
            <Header/>
            <VideoHeader/>
            <main className="flex-grow-1 py-4 bg-main">
                <div className="container">
                    <Outlet />
                </div>
            </main>
            <footer className="bg-dark text-white text-center py-2 mt-auto">
                <p className="mb-0">&copy; 2026 Sanremissimo. Tutti i diritti riservati.</p>
            </footer>
        </div>
    );
}