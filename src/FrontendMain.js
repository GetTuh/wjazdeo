import React, { useRef, useEffect } from "react";
import { useLocation, Switch } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";
import ReactGA from "react-ga";

// Layouts
import LayoutDefault from "./layouts/LayoutDefault";
import About from "./layouts/About";
import Map from "./layouts/Map";
import Login from "./layouts/Login";
import noSite from "./layouts/NoSite";
import Register from "./layouts/Register";
// Views
import Home from "./views/Home";

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = (page) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const FrontendMain = () => {
  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add("is-loaded");
    childRef.current.init();
    trackPage(page);
  }, [location]);

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
          <AppRoute path="/about" layout={About} />
          <AppRoute path="/map" layout={Map} />
          <AppRoute path="/login" layout={Login} />
          <AppRoute path="/register" layout={Register} />
          <AppRoute layout={noSite} />
        </Switch>
      )}
    />
  );
};

export default FrontendMain;
