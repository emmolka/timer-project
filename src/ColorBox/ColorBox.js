import React from "react";
import "../App.css";

const ColorBox = props => {
  return (
    <div
      className="color-box"
      style={{ backgroundColor: props.color }}
      onClick={props.onClick}
    ></div>
  );
};
export default ColorBox;
