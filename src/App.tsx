import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./layouts/Header/Header";
import Footer from "./layouts/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import LoanPage from "./pages/LoanPage/LoanPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Loan from "./pages/Loan/Loan";
import "./styles/base.css";

function App() {
  return (
    <>
      <div className="app-container">
        {/* basename="/NeoflexProject" для githubPages */}
        <BrowserRouter basename="/NeoflexProject">
          <Header />
          <main className="content-wrapper">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/loan-page" element={<LoanPage />} />
              <Route path="loan/:applicationId" element={<Loan />} />
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
