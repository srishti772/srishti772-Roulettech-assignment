// Toast.js
import React from 'react';
import './Toast.css';

function Toast({ type, message }) {
  return <div className={`toast toast-${type}`}>{message}</div>;
}

export default Toast;
