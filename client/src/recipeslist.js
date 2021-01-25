import React from "react";
import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "./css/list.css";
import Recipe from "./recipe";
import RecipeModal from "./recipemodal";


 export default class RecipesList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            showRecipeIsVisible: false,
        }
        this.toggleShowRecipe = this.toggleShowRecipe.bind(this);
        this.closeShowRecipe = this.closeShowRecipe.bind(this);
    }
    toggleShowRecipe() {
        console.log("click toggle")
        this.setState({
            showRecipeIsVisible: !this.state.showRecipeIsVisible,
        });
    }

    closeShowRecipe() {
        console.log("click close uploader")
        this.setState({
            showRecipeIsVisible: false,
        });
    }
    
    renderRecipes() {
        if(!this.props.recipes.recipes){
            return;
        }
        else {
            return (
                <div className="list">
                    {
                        this.props.recipes.recipes.map((recipe, index, modal) => { 
                            return (
                                <>
                                    <div>
                                    <Recipe 
                                        recipe={recipe} 
                                        key={index} 
                                        toggleShowRecipe={this.toggleShowRecipe}
                                        // closeShowRecipe={this.closeShowRecipe}
                                    />
                                    </div>
                                    <div>
                                        {this.state.showRecipeIsVisible && (
                                            
                                                <RecipeModal
                                                    recipe={recipe}
                                                    key={modal} 
                                                    closeShowRecipe={this.closeShowRecipe}
                                                />
                                        )}
                                    </div>

                                </>
                            );
                        })
                    }
                </div>
            )
        }
    }

    render() {
        return (

            <div>
                {this.renderRecipes()}                  
            </div>                   
       );
    }
};
