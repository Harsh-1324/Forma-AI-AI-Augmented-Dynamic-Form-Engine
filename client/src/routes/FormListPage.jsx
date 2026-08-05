import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FormSchemaAPI } from "../services/api.js";

export default function FormListPage() {
  const [schemas, setSchemas] = useState([]);

  useEffect(() => {
    FormSchemaAPI.list().then(setSchemas).catch(() => setSchemas([]));
  }, []);

  return (
    <div>
      <h1 className="page-title">Active Claim Portals</h1>
      <p className="page-subtitle">Select an intake form schema below to begin your AI-assisted claim submission.</p>

      {schemas.length === 0 && <p style={{ color: "#78716c", fontStyle: "italic" }}>No active forms found. Please run the database seed script.</p>}
      
      <div className="form-list-grid">
        {schemas.map((s) => (
          <Link key={s.id} to={`/forms/${s.id}`} className="form-card-link">
            <strong style={{ fontSize: "1.15rem" }}>{s.name}</strong>
            <p style={{ margin: "8px 0 0", color: "#a1a1aa", fontSize: "0.925rem" }}>{s.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
