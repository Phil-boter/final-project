import React from "react";

import "./css/recipemodal.css"


export default function RecipeModal(props) {


    return (
        <>                       
            <div>           
                <p onClick={props.closeShowRecipe}>close</p>                             
            </div>
                                  
                <div className="restaurant">
                    <div className="image-container">                   
                        <img className="recipecard-img" src={props.recipe.recipe.image} alt="" />
                    </div>    
                    <h2>{props.recipe.recipe.label}</h2>               
                    <ol className="recipecard-ingredients">
                        {props.recipe.recipe.ingredients.map((ingredient, index) => ( 
                            <li key={index}>{ingredient.text}</li>
                        ))}
                    </ol>
                    <div className="recipe-information">
                        <p>Instructions</p>
                        <p>on <a href={props.recipe.recipe.url} target="_blank">{props.recipe.recipe.source}</a></p>
                    </div>
                    <div className="restaurant-information">
                        <p className="recipecard-info">Calories: {`${props.recipe.recipe.calories} `}</p>
                            <p className="recipecard-info">Cautions: {`${props.recipe.recipe.cautions} `}</p>
                    </div> 
                </div> 
        </>           
    );
};

