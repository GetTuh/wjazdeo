import React from "react";
import Button from "react-bootstrap/Button";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
const Welcome = () => {
  return (
    <div className="center">
      <Fade>
        <Button variant="primary">Pasażer</Button>
      </Fade>
      <Fade>
        <Link to="/map">
          <Button variant="secondary">Kierowca</Button>
        </Link>
      </Fade>
    </div>
  );
};
export default Welcome;
