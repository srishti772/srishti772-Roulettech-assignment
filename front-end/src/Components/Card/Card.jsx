import "./Card.css";

import React from "react";

function Card({ title, description }) {
  return (
    <div className="card">
      <h4>{title}</h4>
      <p>{description}</p>
      <hr />
      0.5 hour
    </div>
  );
}

export default Card;
