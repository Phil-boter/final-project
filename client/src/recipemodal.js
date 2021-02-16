import React from "react";
import { Component } from "react";
import "./css/recipemodal.css";
import "./css/Restaurant.css";
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
                            <div
                                className="recipe-close-modal"
                                onClick={this.props.closeShowRecipe}
                            >
                                <p>close</p>
                            </div>
                            <div>
                                <a
                                    href={this.props.recipe.recipe.url}
                                    target="_blank"
                                    className="recipe-modal-image"
                                >
                                    <img
                                        className="recipe-modal-image"
                                        src={this.props.recipe.recipe.image}
                                        alt=""
                                    />
                                </a>
                            </div>
                            <h2>{this.props.recipe.recipe.label}</h2>
                            <ul>
                                {this.props.recipe.recipe.ingredients.map(
                                    (ingredient, list) => (
                                        <>
                                            <li key={list}>
                                                {ingredient.text}
                                            </li>
                                        </>
                                    )
                                )}
                            </ul>
                            <div className="recipe-information">
                                <h4>Recipe on:</h4>
                                <a
                                    href={this.props.recipe.recipe.url}
                                    target="_blank"
                                >
                                    {this.props.recipe.recipe.source}
                                </a>
                            </div>
                            <div className="recipe-information">
                                {this.props.renderFeeds}
                            </div>
                            <div className="recipe-information">
                                {this.props.renderTime}
                            </div>
                            <div className="recipe-information">
                                {this.props.renderHealthLabels}
                            </div>
                            <div className="recipe-information">
                                {this.props.renderCautions}
                            </div>
                            <div>
                                <SaveFavorites recipe={this.props.recipe} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
//  className = "recipecard-ingredients";
