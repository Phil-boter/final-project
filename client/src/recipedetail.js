import React from 'react';
import './css/recipedetail.css';

export default function Recipedetail (props) {

// console.log("recipes in recipedetail", props);
// console.log("recipes in recipedetail", props.recipe);
// console.log("recipes in recipedetail", props.recipe.recipe);

    return (
        <div className="cards">
            
                <div className="recipecard-container">
                    <div className="recipecard-container">

                    <h1 className="recipecard-title">{props.recipe.recipe.label}</h1> 
                    <img className="recipecard-img" src={props.recipe.recipe.image} alt="" />
                                    
                    <ol className="recipecard-ingredients">
                        {props.recipe.recipe.ingredients.map(ingredient => ( 
                            <li>{ingredient.text}</li>
                        ))}
                    </ol>
                    <a href={props.recipe.recipe.url}>Instructions</a>
                    <p>on {props.recipe.recipe.source}</p>
                        <div className="recipecard-info-container">
                            <div><p className="recipecard-info">Calories: {props.recipe.recipe.calories}</p></div>
                            <div><p className="recipecard-info">Cautions: {props.recipe.recipe.cautions}</p></div>
                        </div> 
                    </div> 
                </div>
        </div>
    );
};

