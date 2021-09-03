import React from "react";
import { LogoSplash } from "../LogoSplashes/LogoSplash.js";
import "./Navbar.css";

function Navbar({setNavbarChoice}) {
  return (
    <div className="flex-container topnav">
      <nav className="flex-row">
        <div className="nav-section homelogo">
          <LogoSplash />
        </div>
        <div className="nav-section navigation">
          <a href="#" onClick={setNavbarChoice.bind(this,"home")}>Home</a>
          <a href="#" onClick={setNavbarChoice.bind(this,"quizzes")}>Quizzes</a>
          <a href="#" onClick={setNavbarChoice.bind(this,"about")}>About</a>
          <a href="#" onClick={setNavbarChoice.bind(this,"contact")}>Contact</a>
        </div>
        <div className="nav-section social">
          <a href="https://github.com/TravisHunting/0-react-quiz">GitHub</a>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
