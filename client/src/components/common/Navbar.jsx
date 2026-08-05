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
    <header className="navbar-header">
      {/* ---- Desktop bar ---- */}
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          Forma AI
        </Link>

        {/* Center nav links — hidden on mobile */}
        <nav className="navbar-nav hidden-mobile">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="navbar-link">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right-side buttons — hidden on mobile */}
        <div className="navbar-actions hidden-mobile">
          {isLoggedIn ? (
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-stone-300 hover:text-white">
              <LogOut className="size-4 mr-2" />
              Log out
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="text-stone-300 hover:text-white">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className="bg-indigo-600 hover:bg-indigo-500 text-white border-none">
                <Link to="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Hamburger — visible only on mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="visible-mobile-only text-stone-300 hover:text-white"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* ---- Mobile dropdown ---- */}
      {menuOpen && (
        <div className="navbar-mobile-menu visible-mobile-only">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="navbar-mobile-link"
            >
              {link.label}
            </Link>
          ))}
          <div className="navbar-mobile-actions">
            {isLoggedIn ? (
              <Button variant="outline" size="sm" onClick={handleLogout} className="w-full text-stone-300 border-stone-700 hover:bg-stone-800 hover:text-white">
                <LogOut className="size-4 mr-2" />
                Log out
              </Button>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild className="w-full text-stone-300 border-stone-700 hover:bg-stone-800 hover:text-white">
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button size="sm" asChild className="w-full bg-indigo-600 hover:bg-indigo-500 text-white border-none">
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
