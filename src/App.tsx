import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { HashRouter as Router, Route, Routes } from "react-router-dom"; // для корректной загрузки страниц в GH pages
import Header from "./layouts/Header/Header";
import Footer from "./layouts/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import LoanPage from "./pages/LoanPage/LoanPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Loan from "./pages/Loan/Loan";
import Document from "./pages/Document/Document";
import Sign from "./pages/Sign/Sign";
import Code from "./pages/Code/Code";
import "./styles/base.css";

function App() {
  return (
    <>
      <div className="app-container">
        {/* basename="/NeoflexProject" для githubPages */}
        <BrowserRouter basename="/NeoflexProject">
          {/* для нормальной работы роутинга на gh pages */}
          {/* <Router> */}
          <Header />
          <main className="content-wrapper">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/loan" element={<LoanPage />} />
              <Route path="loan/:applicationId" element={<Loan />} />
              <Route
                path="loan/:applicationId/document"
                element={<Document />}
              />
              <Route
                path="loan/:applicationId/document/sign"
                element={<Sign />}
              />
              <Route path="loan/:applicationId/code" element={<Code />} />
              {/* NotFound должен быть поcледним */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
        {/* </Router> */}
      </div>
    </>
  );
}

export default App;
