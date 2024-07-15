import "./Card.css";

import React from "react";

function Card({ recipe }) {
  

  function formatTime(totalTime) {
    // Convert totalTime to a float if it's a string
    const hours = Math.floor(totalTime); // Get the whole number part (hours)
    const minutes = Math.round((totalTime - hours) * 60); // Get the minutes
  
    let formattedTime = '';
    
    // Handle hours
    if (hours > 0) {
      formattedTime += `${hours} hour`;
      if (hours !== 1) {
        formattedTime += 's'; // Pluralize "hour" if it's more than one hour
      }
    }
  
    // Handle minutes
    if (minutes > 0) {
      if (hours > 0) {
        formattedTime += ' ';
      }
      formattedTime += `${minutes} minute`;
      if (minutes !== 1) {
        formattedTime += 's'; // Pluralize "minute" if it's more than one minute
      }
    }
  
    return formattedTime.trim(); // Trim any extra spaces
  }

  return (
    <div className="card">
      <h4>{recipe.title}</h4>
      <p>{recipe.description}</p>
      <hr />
   {formatTime(recipe.total_time)}
    </div>
  );
}

export default Card;
