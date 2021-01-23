import { Component } from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Recipes from "./recipes";
import Navbar from "./navbar";
import Recipedetail from "./recipedetail";

import './css/app.css';


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
            <Route 
                path="/recipedetail/:index"
                render={() => (
                    <Recipedetail
                        key={props.match.index}
                        match={props.match}
                        history={props.history}
                        recipes = {recipes}
                        setRecipes = {setRecipes}
                        input = {input}
                        setInput = {setInput}
                        query = {query}
                        setQuery = {setQuery}
                        img={props.image}
                        url={props.url}
                    />    
                )}
            />  

              
        </> 
        </BrowserRouter>   
    );
}