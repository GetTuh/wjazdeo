import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
export default (Welcome) => {
  return (
    <div>
      <center>
        <Fade left>
          <Button variant="primary">Pasażer</Button>
        </Fade>
        <Fade right>
          <Link to="/map">
            <Button variant="secondary">Kierowca</Button>
          </Link>
        </Fade>
      </center>
    </div>
  );
};
