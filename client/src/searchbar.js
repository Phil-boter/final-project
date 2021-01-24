import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom"
// import { useState, useEffect } from "react";
import { Component } from "react";

import "./css/searchbar.css";


export default class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            recipes: [],
            error:false,
        }
        this.sendRecipe = this.sendRecipe.bind(this);
    }


handleChange(e) {
    console.log("event object name", e.target.name);
    console.log("event object value", e.target.value);
    this.setState({
        input : e.target.value,
    },
    () => console.log("this.state in handleChange", this.state) 
    );
}


handleClick() {
    console.log("click");
    console.log("state submit", this.state);
    if(!this.state.input|| this.state.input === ""){
        return;
    }
        else {
            axios.get(`/api/getRecipe/`+ this.state.input )
                .then(({data}) => {
                   console.log("data getRecipe", data);
                   this.setState({
                       success:true,
                       recipes: {data}
                   })
                   this.sendRecipe(data);
                   console.log("state", this.state);
                })
                .catch((error) => {
                    console.log("error in getRecipe", error);
                })
        }   
}

sendRecipe(data){
    this.props.setRecipe(data);
}


render() {
    return(
            <>
                <div className="search-bar">
                {this.state.error && <h3 className="error">Ooops!! Something went wrong...</h3>}
                        <input className="search-input" 
                                type="text" 
                                onChange={(e) => this.handleChange(e)} />             
                        <button className="search-button" 
                                type="submit"
                                onClick={()=> this.handleClick()}
                                >Search
                        </button>
            
                </div>        
            </>
    );
    }

};