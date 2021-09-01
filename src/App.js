import './static/css/App.css';
import { LogoSplash } from './components/LogoSplashes/LogoSplash';
import { LogoSplash2 } from "./components/LogoSplashes/LogoSplash2";
import { QuestionDisplay } from './components/Questions';
import React, { useState } from 'react';

function App() {

  const [logoVisible, setLogoVisible] = useState(true);
  const [questionNumber, setQuestionNumber] = useState(0);

  // use a state hook to hide or display a component
  // this removes the HTML completely from the browser
  let content;
  let quizContent;
  if (logoVisible) {
    content = <LogoSplash/>;
    quizContent = "";
  } else {
    content = "";
    //quizContent = <QuestionDisplay questionNumber={questionNumber} />;
    quizContent = <QuestionDisplay/>;
  }

  return (
    //<Navbar />

    <div className="App-body">
      <h1>Big Time Quiz Time</h1>

      <div className="content-viewport">
        {content}
        {quizContent}
      </div>

      <div className="App-section">
        <button
          style={{
            width: "200px",
            height: "100px",
            zIndex: "3",
            display: logoVisible ? "" : "none",
          }}
          onClick={() => setLogoVisible(!logoVisible)}
        >
          CLICK TO BEGIN
        </button>
      </div>

      {/* <div className="container">{quizContent}</div> */}

      <h2>Quiz out Baby....</h2>
    </div>

    //<Footer />
  );
}

export default App;
