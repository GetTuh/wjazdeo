import React from 'react';
import './App.css';
import Map from './components/Map'
import { createPortal } from 'react-dom';
function App() {
  return (
    <div className="App">
      <div>
      <Map/>
      </div>
    </div>
  );
}
export default App;
  