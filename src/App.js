import './static/css/App.css';
import { LogoSplash , LogoSplash2 } from './components/LogoSplash/LogoSplash';
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
    quizContent = <QuestionDisplay questionNumber={questionNumber} />;
  }

  return (
    //<Navbar />

    <div className="App-body">
      <h1>Big Time Quiz Time</h1>
<<<<<<< Updated upstream
      <div className="container">
=======
      <div class="content-viewport">
>>>>>>> Stashed changes
        {content}

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

      </div>

      <div className="container">
      {quizContent}
        </div> 


      <h2>Quiz out Baby....</h2>

<<<<<<< HEAD
<<<<<<< Updated upstream
      <div className="testDiv">{content}</div>
=======
      {/* <div class="testDiv">{content}</div> */}
>>>>>>> Stashed changes
=======
>>>>>>> 4912d23014c0a5b3cdf93597c1c914956ecd4655
    </div>

    //<Footer />
  );
}

export default App;
