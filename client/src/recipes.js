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
            </div>                   
       );
    }
};
