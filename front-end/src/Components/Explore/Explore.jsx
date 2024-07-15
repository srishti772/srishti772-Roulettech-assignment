import React, { useEffect, useState } from "react";
import "./Explore.css";
import Card from "../Card/Card";

function Explore() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`${API_URL}/recipes/`)
      .then(response => response.json())
      .then(data => {
        console.log("Fetched recipes:", data);
        setRecipes(data); // Update state with fetched recipes
      })
      .catch(error => {
        console.error("Error fetching recipes:", error);
      });
  };

  return (
    <div className="form-parent">
      <h2>Explore Recipes</h2>
      <div className="explore-parent">
        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          recipes.map(recipe => (
            <Card key={recipe.id} recipe={recipe} />
          ))
        )}
      </div>
    </div>
  );
}

export default Explore;
