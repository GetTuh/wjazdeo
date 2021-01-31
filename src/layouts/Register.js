import React from "react";
import Footer from "../components/layout/Footer";
import Register from "../components/sections/Register";
// import classNames from "classnames";
const LayoutDefault = ({ children }) => (
  <div className="center-content mt-24 pt-8 container-sm">
    <Register />
    <Footer className="pb-0" />
  </div>
);

export default LayoutDefault;
