import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header style={{ borderBottom: "1px solid #e5e7eb", background: "#fff" }}>
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="/" style={{ fontWeight: 700, fontSize: "1.1rem", textDecoration: "none", color: "#111" }}>
          Forma AI
        </Link>
      </div>
    </header>
  );
}
