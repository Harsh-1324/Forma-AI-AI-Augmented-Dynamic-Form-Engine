import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar.jsx";
import FormListPage from "./routes/FormListPage.jsx";
import FormFillPage from "./routes/FormFillPage.jsx";
import ResumeFormPage from "./routes/ResumeFormPage.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<FormListPage />} />
          <Route path="/forms/:schemaId" element={<FormFillPage />} />
          <Route path="/submissions/:submissionId" element={<ResumeFormPage />} />
        </Routes>
      </main>
    </div>
  );
}
