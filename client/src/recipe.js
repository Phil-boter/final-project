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
        this.renderFeeds = this.renderFeeds(this);
        this.closeShowRecipe = this.closeShowRecipe.bind(this);
        this.renderHealthLabels = this.renderHealthLabels.bind(this);
    }

    renderTime() {
        console.log("totaltime", this.props.recipe.recipe.totalTime);
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
        console.log("cautions", this.props.recipe.recipe.cautions);
        if (
            !this.props.recipe.recipe.cautions ||
            this.props.recipe.recipe.cautions.length == "0"
        ) {
            return;
        } else {
            return (
                <>
                    <h4>Cautions:</h4>
                    <ul>
                        {this.props.recipe.recipe.cautions.map(
                            (caution, hint) => (
                                <div key={hint}>
                                    <li>{caution}</li>
                                </div>
                            )
                        )}
                    </ul>
                </>
            );
        }
    }

    renderHealthLabels() {
        if (
            !this.props.recipe.recipe.healthLabels ||
            this.props.recipe.recipe.healthLabels.length == "0"
        ) {
            return;
        } else {
            return (
                <>
                    <h4>Healthlabel:</h4>
                    <ul>
                        {this.props.recipe.recipe.healthLabels.map(
                            (label, list) => (
                                <div key={list}>
                                    <li>{label}</li>
                                </div>
                            )
                        )}
                    </ul>
                </>
            );
        }
    }

    renderFeeds() {
        console.log("yield");
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
                        {this.renderHealthLabels()}
                    </div>
                </div>
                <div>
                    {this.state.showRecipeIsVisible && (
                        <RecipeModal
                            recipe={this.props.recipe}
                            key={this.index}
                            closeShowRecipe={this.closeShowRecipe}
                            renderFeeds={this.renderFeeds}
                            renderTime={this.renderTime()}
                            renderCautions={this.renderCautions()}
                            renderHealthLabels={this.renderHealthLabels()}
                        />
                    )}
                </div>
            </>
        );
    }
}
