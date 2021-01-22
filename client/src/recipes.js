import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";

import "./recipes.css";
import Searchbar from "./searchbar";
import Recipecard from "./recipecard";

export default function Recipes({ recipes, setRecipes, input, setInput, query, setQuery, recipe}) {
    console.log("recipes", recipes);
    // const [recipes, setRecipes] = useState([]);
    // const [input, setInput] = useState("");
    // const [query, setQuery] = useState(``);
    
    return(
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
                        <Recipecard key={index}
                                recipe={recipe}
                        />
                    ))}
                </div>         
            </>
    );
};