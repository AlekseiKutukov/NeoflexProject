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
      <div className="app-container">
        <BrowserRouter>
          <Header />
          <main className="content-wrapper">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* NotFound должен быть поcледним */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
