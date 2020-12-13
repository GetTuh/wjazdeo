import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FeaturesTiles from "../components/sections/FeaturesTiles";

const LayoutDefault = ({ children }) => (
  <>
    <Header navPosition="right" className="reveal-from-bottom" />
    <FeaturesTiles />
    <Footer />
  </>
);

export default LayoutDefault;
