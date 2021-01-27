import React from "react";
import { Component } from "react";
import "./css/recipemodal.css"
import SaveFavorites from "./saveFavorites";



export default class RecipeModal extends Component {
componentDidMount() {
    console.log("this.props RecipeModal", this.props);
}
render() {
    return (
            <>   
                <div className="recipe-modal-container">
                    <div className="recipe-modal-content">
                
                        <div className="restaurant">
                        <div>           
                            <p className="recipe-close-modal" onClick={this.props.closeShowRecipe}>close</p>
                        </div> 
                            <a href={this.props.recipe.recipe.url} target="_blank"><img className="recipe-modal-image" src={this.props.recipe.recipe.image} alt="" /></a>
                            <h2>{this.props.recipe.recipe.label}</h2>               
                            <ol className="recipecard-ingredients">
                                {this.props.recipe.recipe.ingredients.map((ingredient, list) => ( 
                                    <li key={list}>{ingredient.text}</li>
                                ))}
                            </ol>
                            <div className="recipe-information">
                                <p>Instructions on &nbsp; <a href={this.props.recipe.recipe.url} target="_blank">{this.props.recipe.recipe.source}</a></p>
                            </div>
                            <div className="recipe-information">
                                {this.props.renderYield} 
                            </div> 
                            <div className="recipe-information">
                                {this.props.renderTime} 
                            </div> 
                            <div className="recipe-information">  
                                {this.props.renderCautions}
                            </div> 
                            <SaveFavorites 
                                 recipe={this.props.recipe}
                            />
                
                        </div>
                    </div> 
                </div>                    
            </>           
        );
    }
};

