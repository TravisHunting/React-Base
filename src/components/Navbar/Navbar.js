import React from "react";
import { LogoSplash } from "../LogoSplash/LogoSplash";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="flex-container topnav">
      <nav className="flex-row">
        <div className="nav-section homelogo">
          <LogoSplash />
        </div>
        <div className="nav-section navigation">
          <a href="#">Quizzes</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
        <div className="nav-section social">
          <a href="#">GitHub</a>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
