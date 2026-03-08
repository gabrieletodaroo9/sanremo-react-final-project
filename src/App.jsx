import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import HomePage from './pages/HomePage';
import EditionPage from './pages/EditionPage';
import SongPage from './pages/SongPage';
import ArtistPage from './pages/ArtistPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/editions/:id" element={<EditionPage />} />
                    <Route path="/songs/:id" element={<SongPage />} />
                    <Route path="/artists/:id" element={<ArtistPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;