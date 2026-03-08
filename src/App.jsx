import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import HomePage from './pages/HomePage';
import EditionPage from './pages/EditionPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/editions/:id" element={<EditionPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;