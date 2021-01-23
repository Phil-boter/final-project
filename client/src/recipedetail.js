import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './css/recipedetail.css';

export default function Recipedetail ({ recipes, setRecipes, input, setInput, query, setQuery, props, recipe }) {

console.log("recipes in recipedetail", recipes);


    



    return (
        <div className="cards">
            {recipes.map((recipe, index) => ( 
            
                <div key={index} className="recipecard-container">
                    <div className="recipecard-container">

                    <h1 className="recipecard-title">{recipe.recipe.label}</h1> 
                    <img className="recipecard-img" src={recipe.recipe.image} alt="" />
                                    
                    {/* <ol className="recipecard-ingredients">
                        {recipe.recipe.ingredients.map(ingredient => ( 
                            <li>{ingredient.text}</li>
                        ))}
                    </ol>  */}
                    <a href={recipe.recipe.url}>Instructions</a>
                    <p>on {recipe.recipe.source}</p>
                        <div className="recipecard-info-container">
                            <div><p className="recipecard-info">Calories: {recipe.recipe.calories}</p></div>
                            <div><p className="recipecard-info">Cautions: {recipe.recipe.cautions}</p></div>
                        </div> 
                    </div> 
                </div>
                )
            )}
        </div>
    );
};

