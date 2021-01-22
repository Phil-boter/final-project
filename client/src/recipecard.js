import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";


import './recipecard.css';
import Recipedetail from "./recipedetail";

export default function Recipecard ({ recipes, setRecipes, input, setInput, query, setQuery, props, recipe }){
console.log("recipe in recipecard", recipe);
    return (

            <BrowserRouter>
            <>
 
                <div className="recipecard-container">

                    <h1 className="recipecard-title">{recipe.recipe.label}</h1> 
                
                        <Link to="/recipedetail">
                        <img className="recipecard-img" src={recipe.recipe.image} alt="" />
                        </Link>
                    <ol className="recipecard-ingredients">
                        {recipe.recipe.ingredients.map((ingredient, index) => ( 
                            <li key={index}>{ingredient.text}</li>
                        ))}
                    </ol>
                    <a href={recipe.recipe.url} target="_blank">Instructions</a>
                    <p>on {recipe.recipe.source}</p>
                    <div className="recipecard-info-container">
                        <div><p className="recipecard-info">Calories: {recipe.recipe.calories}</p></div>
                        <div><p className="recipecard-info">Cautions: {recipe.recipe.cautions}</p></div>
                    </div>
                </div>
                <Route 
                path="/recipedetail"
                render={()=>  <Recipedetail
                    // img={props.image}
                    // title={props.label}    
                    // ingredients={props.ingredients}
                    // cautions={props.cautions}
                    // uri={props.uri}
                    // source={props.source}
                    // url={props.url}
                    // feeds={props.yield}
                    // time={props.totaltime}
                    // calories={props.calories}
                    />}
                />
            </> 
            </BrowserRouter>
    );
};