import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar__left">SOS APP</div>
      <div className="navbar__right">
        <div className="navbar__linkContainer">
          <Link to="/" className="navbar__link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
