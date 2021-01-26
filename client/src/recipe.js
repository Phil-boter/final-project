import React from "react";
import { Component } from "react";
import "./css/Restaurant.css"
import RecipeModal from "./recipemodal";

export default class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            showRecipeIsVisible: false,
        }
        this.renderCautions = this.renderCautions.bind(this);
        this.renderTime = this.renderTime.bind(this);
        this.renderYield = this.renderYield(this);
        this.closeShowRecipe = this.closeShowRecipe.bind(this);
    }




    renderTime() {
        if(!this.props.recipe.recipe.totalTime || this.props.recipe.recipe.totalTime === "0"){
            return (
            <p>Time: no preparation time provided</p>
            )
        }
        else {
            return (
            <p>Time: {`${this.props.recipe.recipe.totalTime} min`}</p>
            );
        }
    }

    renderCautions() {
        if(!this.props.recipe.recipe.cautions){
            return;
        }
        else {
            return (
            <p>Cautions: {`${this.props.recipe.recipe.cautions} `}</p>
            );
        }
    }

    renderYield() {
        if(!this.props.recipe.recipe.yield){
            return;
        }
        else {
            return (
            <p>Feeds: {`${this.props.recipe.recipe.yield} persons`}</p>
            );
        }
    }


    toggleShowRecipe() {
        console.log("click toggle")
        this.setState({
            showRecipeIsVisible: !this.state.showRecipeIsVisible,
            isVisible: false,
        });
    }

    closeShowRecipe() {
        console.log("click close uploader")
        this.setState({
            showRecipeIsVisible: false,
        });
    }

    render() {
        return (
                <>                       


                    <div className="restaurant" onClick={e => this.toggleShowRecipe()}>
                        <div className="image-container">                   
                            <img className="recipecard-img" src={this.props.recipe.recipe.image} alt="" />
                            {/* <a href={this.props.recipe.recipe.url} target="_blank"><img className="recipecard-img" src={this.props.recipe.recipe.image} alt="" /></a> */}
                        </div>    
                        <h2>{this.props.recipe.recipe.label}</h2>               
                        {/* <ol className="recipecard-ingredients">
                            {this.props.recipe.recipe.ingredients.map((ingredient, index) => ( 
                                <li key={index}>{ingredient.text}</li>
                            ))}
                        </ol>
                        <div className="recipe-information">
                            <p>Instructions on &nbsp; <a href={this.props.recipe.recipe.url} target="_blank">{this.props.recipe.recipe.source}</a></p>
                        </div>
                        <div className="recipe-information">
                            {this.renderYield()} 
                        </div>  */}
                        <div className="recipe-information">
                            {this.renderTime()} 
                        </div> 
                        <div className="recipe-information">  
                            {this.renderCautions()}
                        </div> 
                    </div>
                    <div> 
                                        {this.state.showRecipeIsVisible && (
                                        
                                                <RecipeModal
                                                    recipe={this.props.recipe}
                                                    key={this.index}
                                                    closeShowRecipe={this.closeShowRecipe}
                                                    renderYield={this.renderYield}
                                                    renderTime={this.renderTime}
                                                    renderCautions={this.renderCautions}
                                                />
                                                
                                        )}
                                    </div>

                </>           
        );
    }
};

// onClick={props.toggleShowRecipe} 