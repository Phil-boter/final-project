import React from "react";
import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "./css/recipes.css";
import Searchbar from "./searchbar";


 export default function Recipes({ recipes, setRecipes, input, setInput, query, setQuery, recipe}) {
    console.log("recipes", recipes);
    // const [recipes, setRecipes] = useState([]);
    // const [input, setInput] = useState("");
    // const [query, setQuery] = useState(``);


    return(
        // <BrowserRouter>
            <>
                <Searchbar 
                    recipes={recipes}
                    setRecipes={setRecipes}
                    input={input}
                    setInput={setInput}
                    query={setQuery}
                    setQuery={setQuery}
                />
                
                <div className="cards">
                    {recipes.map((recipe, index) => ( 
                                    
                    <div key={index} className="recipecard-container">                       
                        <h1 className="recipecard-title">{recipe.recipe.label}</h1> 
                        <a href={recipe.recipe.url} target="_blank"><img className="recipecard-img" src={recipe.recipe.image} alt="" /></a>              
                        {/* <Link key={index} to={`/recipedetail/${index}`} >
                            <img className="recipecard-img" src={recipe.recipe.image} alt="" />
                        </Link> */}
                        <ol className="recipecard-ingredients">
                            {recipe.recipe.ingredients.map((ingredient, list) => ( 
                                <li key={list}>{ingredient.text}</li>
                            ))}
                        </ol>
                        <a href={recipe.recipe.url} target="_blank">Instructions</a>
                        <p>on {recipe.recipe.source}</p>
                        <div className="recipecard-info-container">
                                <div><p className="recipecard-info">Calories: {recipe.recipe.calories}</p></div>
                                <div><p className="recipecard-info">Cautions: {recipe.recipe.cautions}</p></div>
                        </div>
                    </div>

                    ))}
                </div>

       
            </>
        // </BrowserRouter>     
     );
   
};