import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { Menu, X, LogOut } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const token = useAuthStore((s) => s.token);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const isLoggedIn = !!token;

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/");
  }

  // Nav links change based on auth state
  const navLinks = [
    { label: "Start a claim", to: "/forms" },
    ...(isLoggedIn ? [{ label: "Dashboard", to: "/dashboard" }] : []),
  ];

  return (
    <header style={{ borderBottom: "1px solid #e5e7eb", background: "#fff" }}>
      {/* ---- Desktop bar ---- */}
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontWeight: 700,
            fontSize: "1.1rem",
            textDecoration: "none",
            color: "#111",
            flexShrink: 0,
          }}
        >
          Forma AI
        </Link>

        {/* Center nav links — hidden on mobile */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "#555",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right-side buttons — hidden on mobile */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}
          className="hidden-mobile"
        >
          {isLoggedIn ? (
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="size-4" />
              Log out
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Hamburger — visible only on mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="visible-mobile-only"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* ---- Mobile dropdown ---- */}
      {menuOpen && (
        <div
          className="visible-mobile-only"
          style={{
            borderTop: "1px solid #f3f4f6",
            padding: "12px 16px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "#555",
                textDecoration: "none",
                padding: "8px 0",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div
            style={{
              borderTop: "1px solid #f3f4f6",
              marginTop: 4,
              paddingTop: 10,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            {isLoggedIn ? (
              <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">
                <LogOut className="size-4" />
                Log out
              </Button>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button size="sm" asChild className="w-full">
                  <Link to="/signup" onClick={() => setMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
