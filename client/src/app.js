import { Component } from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Recipes from "./recipes";
import Navbar from "./navbar";


import './app.css';

export default function App(props) {

    const [recipes, setRecipes] = useState([]);
    const [input, setInput] = useState("");
    const [query, setQuery] = useState(``);
    
    return (
        <BrowserRouter>
        <>
        
            <Route 
                render={()=>  <Navbar />  }
            />
            <div>Hello, World!</div>            
            <Route 
                exact
                path="/"
                render={()=>  <Recipes 
                    recipes = {recipes}
                    setRecipes = {setRecipes}
                    input = {input}
                    setInput = {setInput}
                    query = {query}
                    setQuery = {setQuery}
                
                /> }
            />

              
        </> 
        </BrowserRouter>   
    );
}