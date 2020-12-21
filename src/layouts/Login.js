import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Login from "../components/sections/Login";
// import classNames from "classnames";
const LayoutDefault = ({ children }) => (
  <div className="center-content mt-24 pt-8 container-sm">
    <Login />
    <Footer />
  </div>
);

export default LayoutDefault;
