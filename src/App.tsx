import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import './styles/base.css';

function App() {
  return (
    <>
      {/* <BrowserRouter basename="/NeoflexProject">  для githubPages*/}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* NotFound должен быть помледним */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
