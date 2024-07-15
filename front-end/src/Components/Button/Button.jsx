import React from "react";
import "./Button.css";

function Button({ onClick, children, version, type, isDisabled }) {
  const handleClick = () => {
    if (onClick) {
      onClick(); // Call the onClick function passed from Recipe component
    }
  };

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`btn btn-${version}${isDisabled ? ' btn-disabled' : ""}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  version: "primary",
  type: "button",
  isDisabled: false,
};

export default Button;
