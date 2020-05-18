import React from 'react';
// import logo from './logo.svg';
import MainChat from './components/MainChat';
import './App.css';


function App() {
  return (
    <div className="App">

      

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
        <h1>Thanh Phuc Huynh</h1>
        <p>Leaning... socketIO</p>
        <hr/>
        <MainChat />      
    </div>
  );
}

export default App;
