import { Link } from "react-router-dom";

const PRODUCT_LINKS = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Start a claim", to: "/forms" },
];

const COMPANY_LINKS = [
  { label: "About", to: "#" },
  { label: "Contact", to: "#" },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #e5e7eb",
        background: "#fff",
        padding: "40px 16px 0",
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 32,
          paddingBottom: 32,
        }}
      >
        {/* Brand column */}
        <div>
          <Link
            to="/"
            style={{
              fontWeight: 700,
              fontSize: "1.1rem",
              textDecoration: "none",
              color: "#111",
            }}
          >
            Forma AI
          </Link>
          <p
            style={{
              margin: "8px 0 0",
              color: "#555",
              fontSize: "0.875rem",
              lineHeight: 1.5,
            }}
          >
            AI-augmented dynamic forms for faster, smarter insurance claims.
          </p>
        </div>

        {/* Product column */}
        <div>
          <h4
            style={{
              margin: "0 0 10px",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#111",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            Product
          </h4>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {PRODUCT_LINKS.map((link) => (
              <li key={link.label} style={{ marginBottom: 6 }}>
                <Link
                  to={link.to}
                  style={{
                    fontSize: "0.875rem",
                    color: "#555",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company column */}
        <div>
          <h4
            style={{
              margin: "0 0 10px",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#111",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            Company
          </h4>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {COMPANY_LINKS.map((link) => (
              <li key={link.label} style={{ marginBottom: 6 }}>
                <Link
                  to={link.to}
                  style={{
                    fontSize: "0.875rem",
                    color: "#555",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          borderTop: "1px solid #e5e7eb",
          padding: "16px 0",
          textAlign: "center",
          color: "#999",
          fontSize: "0.8rem",
        }}
      >
        © 2026 Forma AI. All rights reserved.
      </div>
    </footer>
  );
}
