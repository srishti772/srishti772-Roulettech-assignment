// components/Recipe/Recipe.jsx
import React, { useState, useEffect } from "react";
import "./Recipe.css";
import { v4 as uuid } from "uuid";
import Button from "../Button/Button";
import Input from "../Input/Input";
import {
  PlusCircleFill as Plus,
  TrashFill,
  CaretDownFill,
  CaretUpFill,
} from "react-bootstrap-icons";
import Toast from "../Toast/Toast";

function Recipe() {
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [status, setStatus] = useState({
    message:"",
    type:""
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    prep_time: "",
    cook_time: "",
    servings: "",
    ingredients: "",
    steps: "",
  });
  const [newrecipe, setNewRecipe] = useState({
    title: "",
    description: "",
    prep_time: "",
    cook_time: "",
    total_time: 0.0,
    servings: "",
    ingredients: [
      { measurement: "", unit: "", name: "" }, // Initial empty ingredient
    ],
    steps: [
      { number: 1, detail: "" }, // Initial empty ingredient
    ],
  });

  const API_URL = process.env.REACT_APP_API_URL;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let updatedRecipe = {
      ...newrecipe,
      [name]: value,
    };

    if (name === "prep_time" || name === "cook_time") {
      // If preptime or cooktime changes, compute totaltime
      const prepTime = parseFloat(updatedRecipe.prep_time) || 0.0;
      const cookTime = parseFloat(updatedRecipe.cook_time) || 0.0;
      const totalTime =
        isNaN(prepTime) || isNaN(cookTime) ? "" : prepTime + cookTime;
      updatedRecipe = {
        ...updatedRecipe,
        total_time: totalTime.toString(),
      };
    }

    setNewRecipe(updatedRecipe);
  };

  const handleIngredientChange = (index, event) => {
    const { name, value } = event.target;
    const updatedIngredients = [...newrecipe.ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [name]: value,
    };
    setNewRecipe((prevValue) => ({
      ...prevValue,
      ingredients: updatedIngredients,
    }));
  };

  const handleAddIngredient = () => {
    console.log("handle ingredient change");
    setNewRecipe((prevValue) => ({
      ...prevValue,
      ingredients: [
        ...prevValue.ingredients,
        { measurement: "", unit: "", name: "" },
      ],
    }));
  };

  const handleAddStep = () => {
    const newStepNumber = newrecipe.steps.length + 1;
    setNewRecipe((prevValue) => ({
      ...prevValue,
      steps: [...prevValue.steps, { number: newStepNumber, detail: "" }],
    }));
  };

  const handleStepChange = (index, event) => {
    const { name, value } = event.target;
    const updatedSteps = [...newrecipe.steps];
    updatedSteps[index] = {
      ...updatedSteps[index],
      [name]: value,
    };
    setNewRecipe((prevValue) => ({
      ...prevValue,
      steps: updatedSteps,
    }));
  };
  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...newrecipe.ingredients];
    updatedIngredients.splice(index, 1);
    setNewRecipe((prevValue) => ({
      ...prevValue,
      ingredients: updatedIngredients,
    }));
  };

  const handleOrder = (index, Dir) => {
    let temp = "";
    let changed = [...newrecipe.steps];
    if (Dir === "Up") {
      temp = changed[index - 1].detail;
      changed[index - 1].detail = changed[index].detail;
    } else {
      temp = changed[index + 1].detail;
      changed[index + 1].detail = changed[index].detail;
    }

    changed[index].detail = temp;
    setNewRecipe((prevValue) => ({
      ...prevValue,
      steps: changed,
    }));
  };

  useEffect(() => {
    // Function to check if form can be submitted
    const handleSubmitDisabled = () => {
      // Get all input elements or use a specific selector based on your form structure
      const inputs = document.querySelectorAll(".inp:not([hidden])");

      // Check validity of each input
      let formIsValid = true;
      inputs.forEach((input) => {
        // Check if the input is valid based on its class name
        if (
          (input.classList.length === 2 && input.classList[1] === "issue") ||
          input.classList.length === 1
        ) {
          console.log("***", input, input.classList);
          formIsValid = false;
        }
      });

      console.log("***isformVALID", formIsValid);
      setSubmitDisabled(!formIsValid);
    };

    handleSubmitDisabled();

    return () => {};
  }, [newrecipe]); // Dependency array

  const handleSubmit = () => {
    console.log(JSON.stringify(newrecipe));
    console.log("api url", API_URL);

    fetch(`${API_URL}/recipes/create/`, {
      method: "POST",
      body: JSON.stringify(newrecipe),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("res received", response);
        if(response.status===201){
          setStatus({
            message:"Saved Successfully",
            type:"success"
          });
        }else{
          setStatus({
            message:"Error",
            type:"fail"
          });
        }

        return response.json();
      })
      .then((data) => {
        console.log("data received", data);
       
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <section className="form-parent">
        <h2>Submit A Recipie</h2>

        <form className="form">
          <Input
            name="id"
            type="text"
            placeholder="Recipe ID"
            value={newrecipe.id}
            disabled
            hidden={true}
          />

          <Input
            name="title"
            type="text"
            placeholder="Title"
            onChange={handleInputChange}
            value={newrecipe.title}
          />

          <Input
            name="description"
            type="text"
            placeholder="Recipe Description"
            onChange={handleInputChange}
            required={true}
            value={newrecipe.description}
          />

          <div className="form-group">
            <Input
              name="prep_time"
              type="text"
              pattern="^\d*\.?\d+$"
              placeholder="Prep Time"
              required={true}
              value={newrecipe.prep_time}
              onChange={handleInputChange}
            />{" "}
            <span>hours</span>
            <Input
              name="cook_time"
              type="text"
              pattern="^\d*\.?\d+$"
              placeholder="Cook Time"
              required={true}
              value={newrecipe.cook_time}
              onChange={handleInputChange}
            />{" "}
            <span>hours</span>
            <div className="form-group">
              <label htmlFor="total_time">Total:</label>
              {newrecipe.total_time} <span>hours</span>
            </div>
          </div>

          <Input
            name="servings"
            type="number"
            placeholder="servings"
            required={true}
            value={newrecipe.servings}
            onChange={handleInputChange}
          />

          <hr />

          <h4>Ingredients</h4>

          <div className="form-group form-ingredients-container">
            <ul>
              {newrecipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <Input
                    name="unit"
                    type="text"
                    pattern="^\d*\.?\d+$"
                    placeholder="Unit"
                    required={true}
                    value={ingredient.unit}
                    onChange={(e) => handleIngredientChange(index, e)}
                  />

                  <Input
                    name="measurement"
                    type="text"
                    placeholder="Measurement"
                    value={ingredient.measurement}
                    list={`measurement-list-${index}`}
                    onChange={(e) => handleIngredientChange(index, e)}
                    required={true}
                    pattern="Tbsp|Cups|Cup|Grams|Kilograms|Ounces|"
                  />
                  <datalist id={`measurement-list-${index}`}>
                    <option value="Tbsp">Tablespoon (tbsp)</option>
                    <option value="Cups">Cups</option>
                    <option value="Cup">Cup</option>
                    <option value="Grams">Grams</option>
                    <option value="Kilograms">Kilograms</option>
                    <option value="Ounces">Ounces</option>
                  </datalist>

                  <Input
                    name="name"
                    type="text"
                    placeholder="Ingredient Name"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, e)}
                    required={true}
                    pattern="[A-Za-z ]*"
                  />
                  {index > 0 && (
                    <Button
                      version="secondary"
                      type="button"
                      isDisabled={false}
                      onClick={() => handleRemoveIngredient(index)}
                    >
                      <TrashFill />
                    </Button>
                  )}
                </li>
              ))}
            </ul>
            <Button
              version="secondary"
              type="button"
              isDisabled={false}
              onClick={handleAddIngredient}
            >
              <Plus />
            </Button>
          </div>

          <hr />

          <h4>Steps</h4>
          <div className="form-group form-step-container">
            <ul>
              {newrecipe.steps.map((step, index) => (
                <li key={index}>
                  {step.number}.
                  <Input
                    name="detail"
                    type="text"
                    required={true}
                    placeholder="Detailed Step"
                    value={step.detail}
                    onChange={(e) => handleStepChange(index, e)}
                  />
                  {index > 0 && (
                    <Button
                      version="secondary"
                      type="button"
                      isDisabled={false}
                      onClick={() => handleOrder(index, "Up")}
                    >
                      <CaretUpFill />
                    </Button>
                  )}
                  {index < newrecipe.steps.length - 1 && (
                    <Button
                      version="secondary"
                      type="button"
                      isDisabled={false}
                      onClick={() => handleOrder(index, "D")}
                    >
                      <CaretDownFill />
                    </Button>
                  )}
                </li>
              ))}
            </ul>

            <Button
              version="secondary"
              type="button"
              isDisabled={false}
              onClick={handleAddStep}
            >
              <Plus />
            </Button>
          </div>
        </form>

        <Button
          version="primary"
          type="button"
          isDisabled={submitDisabled}
          onClick={handleSubmit}
        >
          Submit
        </Button>

        <Toast message={status.message} type={status.type}/>
      </section>
    </>
  );
}

export default Recipe;
