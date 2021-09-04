import './static/css/App.css';
import { LogoSplash } from './components/LogoSplashes/LogoSplash.js';
import { QuestionDisplay } from './components/Questions.js';
import { Colorbar } from './components/Colorbar.js';
import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar.js';
import { APOD } from './components/APOD.js';
function App() {

  const [navbarChoice, setNavbarChoice] = useState("home");

  let content;

  switch (navbarChoice) {
    case "home":
      content = <LogoSplash/>;
      break;
    case "quizzes":
      content = <QuestionDisplay />;
      break;
    case "about":
      content = <LogoSplash />; //placeholder
      break;
    case "contact":
      content = <LogoSplash />; //placeholder
      break;
    case "color":
      content = <Colorbar />
      break;
    case "apod":
      content = <APOD />
      break;  
    default:
      content = <LogoSplash />;
      break;
  }

  return (
    <div>
      <Navbar setNavbarChoice={setNavbarChoice}/>
      <div className="App-body">

        <div className="content-viewport">
          {content}
        </div>

      </div>
     {/* <Footer /> */}
    </div>
  );
}

export default App;
