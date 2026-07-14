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
      <h1>Start a claim</h1>
      {schemas.length === 0 && <p>No form types available yet. Run the seed script.</p>}
      {schemas.map((s) => (
        <Link key={s._id} to={`/forms/${s._id}`} className="card" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
          <strong>{s.name}</strong>
          <p style={{ margin: "6px 0 0", color: "#555" }}>{s.description}</p>
        </Link>
      ))}
    </div>
  );
}
