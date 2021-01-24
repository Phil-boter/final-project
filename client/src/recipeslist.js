import React from "react";
import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "./css/list.css";
import Recipe from "./recipe";


 export default class RecipesList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            error: false
        }
        
    }
    
    renderRecipes() {
        if(!this.props.recipes.recipes){
            return;
        }
        else {
            return (
                <div className="list">
                    {
                        this.props.recipes.recipes.map((recipe, index) => { 
                            return <Recipe recipe={recipe} key={index} />
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
