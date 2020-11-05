import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Map from "./components/Map";
import Welcome from "./components/Welcome";
import { AnimatedSwitch, spring } from "react-router-transition";
import { BrowserRouter, Route } from "react-router-dom";
function App() {
  function bounce(val) {
    return spring(val, {
      stiffness: 330,
      damping: 22,
    });
  }
  const bounceTransition = {
    atLeave: {
      opacity: bounce(0),
      scale: bounce(0.8),
    },
    atActive: {
      opacity: bounce(1),
      scale: bounce(1),
    },
  };

  return (
    <div className="App">
      <BrowserRouter>
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper"
        >
          <Route path="/" component={Welcome} exact={true} />
          <Route path="/map" component={Map} />
        </AnimatedSwitch>
      </BrowserRouter>
    </div>
  );
}
export default App;
