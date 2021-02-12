import React from "react";
import { Component } from "react";
import "./css/Restaurant.css";
import RecipeModal from "./recipemodal";

import "./css/Restaurant.css";
import "./css/recipelist.css";
import "./css/recipemodal.css";

export default class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            showRecipeIsVisible: false,
        };
        this.renderCautions = this.renderCautions.bind(this);
        this.renderTime = this.renderTime.bind(this);
        this.renderYield = this.renderYield(this);
        this.closeShowRecipe = this.closeShowRecipe.bind(this);
    }

    renderTime() {
        if (
            !this.props.recipe.recipe.totalTime ||
            this.props.recipe.recipe.totalTime === "0"
        ) {
            return (
                <>
                    <>
                        <h4>Time:</h4>
                        <p>no preparation time provided</p>
                    </>
                </>
            );
        } else {
            return (
                <>
                    <h4>Time:</h4>
                    <p>{`${this.props.recipe.recipe.totalTime} min`}</p>
                </>
            );
        }
    }

    renderCautions() {
        if (
            !this.props.recipe.recipe.cautions ||
            this.props.recipe.recipe.cautions.length == "0"
        ) {
            return;
        } else {
            return (
                <>
                    <h4>Cautions:</h4>
                    <p>{` ${this.props.recipe.recipe.cautions} `} </p>
                </>
            );
        }
    }

    renderYield() {
        if (!this.props.recipe.recipe.yield) {
            return;
        } else {
            return (
                <>
                    <h4>Feeds:</h4>
                    <p>{`${this.props.recipe.recipe.yield} persons`}</p>
                </>
            );
        }
    }

    toggleShowRecipe() {
        console.log("click toggle");
        this.setState({
            showRecipeIsVisible: !this.state.showRecipeIsVisible,
            isVisible: false,
        });
    }

    closeShowRecipe() {
        console.log("click close uploader");
        this.setState({
            showRecipeIsVisible: false,
        });
    }

    render() {
        return (
            <>
                <div
                    className="restaurant"
                    onClick={(e) => this.toggleShowRecipe()}
                >
                    <div className="image-container">
                        <img
                            className="recipecard-img"
                            src={this.props.recipe.recipe.image}
                            alt=""
                        />
                    </div>
                    <h2>{this.props.recipe.recipe.label}</h2>
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
                            renderTime={this.renderTime()}
                            renderCautions={this.renderCautions()}
                        />
                    )}
                </div>
            </>
        );
    }
}
