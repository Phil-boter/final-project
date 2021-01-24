import { Component } from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Recipes from "./recipes";
import Navbar from "./navbar";
import Searchbar from "./searchbar";

import './css/app.css';




export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "",
            last: "",
            image: "",
            id: "",
            bio: "",
            recipes: {},
            // uploaderIsVisible: false
        };
        this.setRecipe = this.setRecipe.bind(this);
        // this.toggleUploader = this.toggleUploader.bind(this);
        // this.closeUploader= this.closeUploader.bind(this);
    }

    componentDidMount() {
        console.log("component did mount");

        axios.get("/user")
            .then(({data})=> {
                if(data.success){
                    console.log("data",data);
                    this.setState({
                        success: true,
                        id: data.id,
                        first: data.first,
                        last: data.last,
                        image: data.image,
                        bio: data.bio,
                        uploaderIsVisible: false,
                    });
                    console.log("state", this.state);
                }
                else {
                    this.setState({
                        error: true
                    });
                }
        });
    }

    setRecipe(data) {
        console.log("new recipe: ", data);
        this.setState({
            recipes: data,
            uploaderIsVisible: false,
        });
    }

    render() {
        console.log("recipes: ", this.state.recipes);
  
            return (
                <BrowserRouter>
                <>
                
                    <Route 
                        render={()=>  <Navbar />  }
                    />      

                    <Searchbar 
                        setRecipe = {this.setRecipe}
                    />

                    <Route 
                        exact
                        path="/"
                        render={()=>  <Recipes 
                            setRecipe={this.setRecipe}
                            recipes={this.state.recipes}                       
                        /> }
                    />  


        
                      
                </> 
                </BrowserRouter>   
            );   
    }
}
