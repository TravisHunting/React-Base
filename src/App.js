import React from 'react';

import { LogoSplash } from './components/LogoSplashes/LogoSplash.js';
import { QuestionDisplay } from './components/Questions.js';
import { Colorbar } from './components/Colorbar.js';
import { ColorbarAuto } from './components/ColorbarAuto.js';
import Navbar from './components/Navbar/Navbar.js';
import { APOD } from './components/APOD.js';
import { ChessPuzzle } from './components/ChessPuzzle';
import { Switch, Route } from "react-router-dom";

import './static/css/App.css';


function App() {

  return (
    <div>
      <Navbar />
      <div className="App-body">

        <div className="content-viewport">

          <Switch>
              <Route exact path="/">
                  <LogoSplash />
              </Route>

              <Route path="/quizzes">
                  <QuestionDisplay />
              </Route>

              <Route path="/color">
                  <ColorbarAuto />
              </Route>

              <Route path="/apod">
                  <APOD />
              </Route>

              <Route path="/chess">
                  <ChessPuzzle />
              </Route>
          </Switch>

        </div>

      </div>
     {/* <Footer /> */}
    </div>
  );
}

export default App;
