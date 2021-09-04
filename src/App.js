import './static/css/App.css';
import { LogoSplash } from './components/LogoSplashes/LogoSplash';
import { QuestionDisplay } from './components/Questions';
import { Colorbar } from './components/Colorbar.js';
import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
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
    default:
      content = <LogoSplash />;
      break;
  }

  return (
    <div>
      <Navbar setNavbarChoice={setNavbarChoice}/>
      <div className="App-body">
        <h1>Big Time Quiz Time</h1>

        <div className="content-viewport">
          {content}
        </div>

        <h2>Quiz out Baby....</h2>
      </div>
     {/* <Footer /> */}
    </div>
  );
}

export default App;
