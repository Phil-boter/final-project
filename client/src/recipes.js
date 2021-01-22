import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";

import "./recipes.css";
import Recipecard from "./recipecard";

export default function Recipes() {

    const [recipes, setRecipes] = useState([]);
    const [input, setInput] = useState("");
    const [query, setQuery] = useState(``);
    
    useEffect(() => {
       getRecipes();
    }, [query]);

    const getRecipes = () => {

        if(!query || query === ""){
            return;
        }
        else {
            axios.get(`/api/getRecipe/`+ input )
                .then(({data}) => {
                   console.log("data getRecipe", data);
                   
                   setRecipes(data.recipes);    
                })
                .catch((error) => {
                    console.log("error in getRecipe", error);
                })
        }    
    } 
  
    const onChange = (e) => {
      setInput(e.target.value);
    }
    
    const getSearch = (event) => {
      event.preventDefault(); // verhindert das aktualisieren der seite
      setQuery(input);
  
    }
    return(
            <>
                <div className="search-bar">
                    <form className="search-form"
                        onSubmit={ getSearch }
                        >
                        <input className="search-input" 
                                type="text" 
                                onChange={ onChange } />               
                        <button className="search-button" 
                                type="submit"
                                >Search
                        </button>
                    </form>
                </div>
                
                <div className="cards">
                    {input && recipes.map((recipe, index) => (
                        <Recipecard key={index}              
                                img={recipe.recipe.image}
                                title={recipe.recipe.label}    
                                ingredients={recipe.recipe.ingredients}
                                cautions={recipe.recipe.cautions}  
                        />
                    ))}
                </div>         
            </>
    );
};