import React from "react";
import { Component } from "react";
import "./css/recipemodal.css"


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
                        <div className="image-container">                   
                            <a href={this.props.recipe.recipe.url} target="_blank"><img className="recipe-modal-image" src={this.props.recipe.recipe.image} alt="" /></a>
                        </div>    
                        <h2>{this.props.recipe.recipe.label}</h2>               
                        <ol className="recipecard-ingredients">
                            {this.props.recipe.recipe.ingredients.map((ingredient, index) => ( 
                                <li key={index}>{ingredient.text}</li>
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
                    </div>
                </div> 
            </div>                    
        </>           
    );
    }
};

