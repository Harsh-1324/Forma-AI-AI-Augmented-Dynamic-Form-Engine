import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Forma AI
        </Link>
      </div>
    </header>
  );
}
