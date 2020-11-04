import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { bounce } from "react-animations";
import Radium, { StyleRoot } from "radium";

const styles = {
  bounce: {
    animation: "x 1s",
    animationName: Radium.keyframes(bounce, "bounce"),
  },
};
export default (Welcome) => {
  //   const [elo, setElo] = useState(styles.bounce);
  return (
    <StyleRoot>
      <div className="test" style={styles.bounce}>
        placeholder
      </div>
    </StyleRoot>
  );
};
