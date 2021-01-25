import React from "react";
import "./css/recipe.css";
import "./css/Restaurant.css"
import RecipeModal from "./recipemodal";

export default function Recipe(props) {

// console.log("recipes in recipe", props);
console.log("recipes in recipe", props.recipe);
console.log("recipes in recipe", props.recipe.recipe);

    return (
            <>                       


                <div className="restaurant">
                    <div className="image-container">                   
                        <img className="recipecard-img" src={props.recipe.recipe.image} alt="" onClick={props.toggleShowRecipe} />
                    </div>    
                    <h2>{props.recipe.recipe.label}</h2>               
                    <ol className="recipecard-ingredients">
                        {props.recipe.recipe.ingredients.map((ingredient, index) => ( 
                            <li key={index}>{ingredient.text}</li>
                        ))}
                    </ol>
                    <div className="restaurant-information">
                    <a href={props.recipe.recipe.url}>Instructions</a>
                    <p>on {props.recipe.recipe.source}</p>
                        <div className="restaurant-address">
                            <p className="recipecard-info">Calories: {props.recipe.recipe.calories}&nbsp;</p>
                            <p className="recipecard-info">Cautions: {props.recipe.recipe.cautions}&nbsp;</p>
                        </div> 
                    </div> 
                </div>

            </>           
    );
};

