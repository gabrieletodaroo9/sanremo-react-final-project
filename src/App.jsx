import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import HomePage from './pages/HomePage';
import EditionPage from './pages/EditionPage';
import SongPage from './pages/SongPage';
import ArtistPage from './pages/ArtistPage';
import AboutUsPage from './pages/AboutUsPage';
import ScrollToTop from './components/ScrollToTop';
import NotFoundPage from './pages/NotFoundPage';

function App() {
    return (
        <BrowserRouter>
        <ScrollToTop />
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/aboutus" element={<AboutUsPage />} />
                    <Route path="/songs/:id" element={<SongPage />} />
                    <Route path="/artists/:id" element={<ArtistPage />} />
                    <Route path="/editions/:id" element={<EditionPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;