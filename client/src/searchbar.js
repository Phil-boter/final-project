import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";

import "./searchbar.css";


export default function Searchbar({ input, setInput, recipes, setRecipes, query, setQuery }) {

    // const [recipes, setRecipes] = useState([]);
    const [value, setValue] = useState("");
    const [search, setSearch] = useState(``);
    
    useEffect(() => {
       getRecipes();
    }, [search]);

    const getRecipes = () => {

        if(!search || search === ""){
            return;
        }
        else {
            axios.get(`/api/getRecipe/`+ value )
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
      setValue(e.target.value);
    }
    
    const getSearch = (event) => {
      event.preventDefault(); // verhindert das aktualisieren der seite
      setSearch(value);
  
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
            </>
    );
};