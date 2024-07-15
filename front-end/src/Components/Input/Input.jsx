// components/Input/Input.jsx
import React, { useState, useEffect } from "react";
import "./Input.css";
import { CheckCircleFill, XCircleFill } from "react-bootstrap-icons";

const Input = ({
  name,
  type,
  placeholder,
  value,
  onChange,
  disabled,
  required,
  pattern,

  list,
  hidden,
}) => {
  const [isValid, setIsValid] = useState(undefined);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const validity = e.target.validity.valid;
    setIsValid(validity);

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="inputContainer">
      <input
        className={`inp ${
          isValid === undefined ? "" : isValid ? "valid" : "issue"
        }`}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        pattern={pattern}
        list={list}
        hidden={hidden}
      />
      {isValid !== undefined && (
        <span className="input-icon">
          {isValid ? (
            <CheckCircleFill color="green" />
          ) : (
            <XCircleFill color="red" />
          )}
        </span>
      )}
    </div>
  );
};

export default Input;
