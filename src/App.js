import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';

const App = () => {
  return (
    <div className="App">
      <div className="header">
        <h1>Simplified Youtube</h1>
      </div>
      <Navigation />
    </div>
  )
}

export default App;
