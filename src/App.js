import './static/css/App.css';
import LogoSplash from './components/LogoSplash/LogoSplash';
import { QuestionDisplay } from './components/Questions';
import React, { useState } from 'react';

function App() {

  const [logoVisible, setLogoVisible] = useState(true);
  const [questionNumber, setQuestionNumber] = useState(0);

  // use a state hook to hide or display a component
  // this removes the HTML completely from the browser
  let content;
  if (logoVisible) {
    content = <LogoSplash/>
  } else {
    content = "";
  }


  return (
    //<Navbar />

    <div className="App-body">
      <h1>Big Time Quiz Time</h1>
      <div class="container">
        {content}

        {/* use the style+display to show or hide the component */}
        {/* this leaves the HTML in the browser  */}
        {/* <div className="" style={{ display: !logoVisible ? "" : "none" }}>
          <QuestionDisplay questionNumber={questionNumber} />
        </div>

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
        </button> */}
      </div>
      <h2>Quiz out Baby....</h2>

      <div class="testDiv">{content}</div>
    </div>

    //<Footer />
  );
}

export default App;
