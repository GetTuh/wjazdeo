import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Map from "./components/Map";
import Welcome from "./components/Welcome";
import { createPortal } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Route path="/" component={Welcome} exact={true} />
          <Route path="/map" component={Map} />
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
