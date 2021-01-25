import React from "react";
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
                        {/* <img className="recipecard-img" src={props.recipe.recipe.image} alt="" /> */}
                        <a href={props.recipe.recipe.url} target="_blank"><img className="recipecard-img" src={props.recipe.recipe.image} alt="" /></a>
                    </div>    
                    <h2>{props.recipe.recipe.label}</h2>               
                    <ol className="recipecard-ingredients">
                        {props.recipe.recipe.ingredients.map((ingredient, index) => ( 
                            <li key={index}>{ingredient.text}</li>
                        ))}
                    </ol>
                    <div className="recipe-information">
                        <p>Instructions</p>
                        <p>on &nbsp; <a href={props.recipe.recipe.url} target="_blank">{props.recipe.recipe.source}</a></p>
                    </div>
                    <div className="recipe-information">
                        <p>Time: {`${props.recipe.recipe.totalTime} min `}</p>    
                    </div> 
                    <div className="recipe-information">  
                        <p>Cautions: {`${props.recipe.recipe.cautions} `}</p>
                    </div> 
                </div>

            </>           
    );
};

// onClick={props.toggleShowRecipe} 