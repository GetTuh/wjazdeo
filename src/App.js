import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Map from "./components/Map";
import Welcome from "./components/Welcome";
import { createPortal } from "react-dom";
function App() {
  return (
    <div className="App">
      <div>
        {/* <Map /> */}
        <Welcome></Welcome>
      </div>
    </div>
  );
}
export default App;
