import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./searchbar.css";

export default function Searchbar() {

    const [recipes, setRecipes] = useState([]);
    const [input, setInput] = useState("");
    const [query, setQuery] = useState(``);
    console.log("query", query);
    
    useEffect(() => {
       getRecipes();
    }, [query]);

    const getRecipes = () => {
        console.log("input getRec", input);
        console.log("query getRec", query)
        if(!query || query === ""){
            return;
        }
        else {
            axios.get(`/api/getRecipe/`+ input )
                .then(({data}) => {
                   console.log("data getRecipe", data);    
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
        
          
          
            </>
    );
};