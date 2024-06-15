import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          OctoPush
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/session" className="navbar-link">
            Session
          </Link>
          <Link to="/send-message" className="navbar-link">
            Send Message
          </Link>
          <Link to="/test" className="navbar-link">
            Test
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
