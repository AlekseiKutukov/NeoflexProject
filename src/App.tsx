import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import './styles/base.css';

function App() {
  return (
    <>
      {/* <BrowserRouter basename="/NeoflexProject">  для githubPages*/}
      <BrowserRouter>
        <div className="app-container">
          <Header />
          <main className="content-wrapper">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* NotFound должен быть помледним */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
