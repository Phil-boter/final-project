import React from "react";
import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "./css/recipes.css";
import Recipedetail from "./recipedetail";


 export default class Recipes extends Component{
    constructor(props) {
        super(props);
        this.state = {
            error: false
        }
        
    }
    
    renderRecipes() {
        if(!this.props.recipes.recipes){
            return ;
        }
        else {
            return (

            <div>


            <p>Èl Jefe</p>
            <div> 
                {
                    this.props.recipes.recipes.map((recipe, index) => { 
                        return <Recipedetail recipe={recipe} key={index} />
                    })
                }

            </div>
            </div>
            )
        }
    }

    render() {
        return (

            <div>
                {this.renderRecipes()}
                {/* <div> 
                    {
                        this.props.recipes.recipes.map((recipe, index) => { 
                            return <Recipedetail recipe={recipe} key={index} />
                        })
                    }

                </div> */}
                {/* <p>hello world</p>
                <div className="cards">
                     {!props.length && props && <p>nothing found</p>} 
                     {props && props.recipes.recipes.map((recipe, index) => ( 
                                    
                    <div key={index} className="recipecard-container">   
                        <p>helloe  world</p> */}
                        {/* <h1 className="recipecard-title">{recipe.recipe.label}</h1>  */}
                        {/* <img className="recipecard-img" src={recipe.recipe.image} alt="" onClick={ showDetails }/> */}
                        {/* <a href={recipe.recipe.url} target="_blank"><img className="recipecard-img" src={recipe.recipe.image} alt="" /></a>              */}
                        {/* <Link key={index} to={`/recipedetail/${index}`} >
                            <img className="recipecard-img" src={recipe.recipe.image} alt="" />
                        </Link> */}
                        {/* <ol className="recipecard-ingredients">
                            {recipe.recipe.ingredients.map((ingredient, list) => ( 
                                <li key={list}>{ingredient.text}</li>
                            ))}
                        </ol> */}
                        {/* <a href={recipe.recipe.url} target="_blank">Instructions</a>
                        <p>on {recipe.recipe.source}</p>
                        <div className="recipecard-info-container">
                                <div><p className="recipecard-info">Calories: {recipe.recipe.calories}</p></div>
                                <div><p className="recipecard-info">Cautions: {recipe.recipe.cautions}</p></div>
                        </div> 
                </div>*/}
                    {/* )
                    )}
            
                </div>  */}
                  
            </div>
              
            
        
                    
       );
    }
};
