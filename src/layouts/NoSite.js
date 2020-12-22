import React from "react";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";

const NoSite = ({ children }) => (
  <div className="ta-c">
    <h1 className="text-color-warning">UPS!</h1>
    <p>Ta strona nie istneje, albo nawet nigdy nie istniała!</p>
    <Link to="/">
      <u>Powrót do głównej strony</u>
    </Link>
    <Footer />
  </div>
);

export default NoSite;
