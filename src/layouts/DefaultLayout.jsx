import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
    return (
        <div className="min-vh-100 d-flex flex-column">
            <header>sono l'header</header>
            <main className="flex-grow-1 py-4">
                <div className="container">
                    <Outlet />
                </div>
            </main>
            <footer className="bg-dark text-white text-center py-3 mt-auto">
                <p className="mb-0">&copy; 2026 Sanremo Archive - Fullstack Project</p>
            </footer>
        </div>
    );
}