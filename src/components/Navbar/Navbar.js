import React from "react";

import { LogoSplash } from "../LogoSplashes/LogoSplash.js";
import { Link } from "react-router-dom";

import "./Navbar.css";


function Navbar() {
  return (
    <div className="flex-container topnav">
      <nav className="flex-row">
        <div className="nav-section homelogo">
          <LogoSplash />
        </div>
        <div className="nav-section navigation">

          <Link to="/">Home</Link>
          <Link to="/quizzes">Quizzes</Link>
          <Link to="/color">Generate Colors</Link>
          <Link to="/apod">APOD</Link>
          <Link to="/chess">Chess</Link>

        </div>
        <div className="nav-section social">
          <a href="https://github.com/TravisHunting/0-react-quiz">GitHub</a>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
