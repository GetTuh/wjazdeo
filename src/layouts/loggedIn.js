import React from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import LoggedIn from "../components/sections/LoggedIn";
import Logo from "../components/layout/partials/Logo";
import { Link } from "react-router-dom";

const LoggedInView = ({ children }) => (
  <div className="center-content mt-24 pt-8 container">
    <Header navPosition="top" className="reveal-from-bottom" />
    <LoggedIn />
    <Footer className="pb-0" />
  </div>
);

export default LoggedInView;
