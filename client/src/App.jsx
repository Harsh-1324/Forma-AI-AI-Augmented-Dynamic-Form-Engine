import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar.jsx";
import Footer from "./components/common/Footer.jsx";
import FormListPage from "./routes/FormListPage.jsx";
import FormFillPage from "./routes/FormFillPage.jsx";
import ResumeFormPage from "./routes/ResumeFormPage.jsx";
import LoginPage from "./routes/LoginPage.jsx";
import SignupPage from "./routes/SignupPage.jsx";
import DashboardPage from "./routes/DashboardPage.jsx";
import LandingPage from "./routes/LandingPage.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/forms" element={<FormListPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/forms/:schemaId" element={<FormFillPage />} />
          <Route path="/submissions/:submissionId" element={<ResumeFormPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
