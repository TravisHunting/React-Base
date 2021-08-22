import greek_key_logo_01 from './static/images/logo350.png';
import './static/css/App.css';

// debugger; This will cause the app to pause in chrome

function App() {
  return (
    <div className="App">
      <header className="App-header Background-01">
        <img src={greek_key_logo_01} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React NOW!!!!
        </a>
      </header>
    </div>
  );
}

export default App;
