import React from "react";
import "./Display.css";

const DisplayButtom = ({ onClick, disabled }) => {
  return (
    <button className={`sort-button ${disabled ? "disabled" : ""}`} onClick={onClick} disabled={disabled}>
      Show Desc.
    </button>
  );
};

export default DisplayButtom;
