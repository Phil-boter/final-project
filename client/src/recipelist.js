import React from "react";
import { Component } from "react";

import "./css/recipelist.css";
import Recipe from "./recipe";

export default class RecipeList extends Component {
    renderRecipes() {
        if (!this.props.recipes.recipes) {
            return;
        } else {
            return (
                <div className="list">
                    {this.props.recipes.recipes.map((recipe, index) => {
                        return (
                            <>
                                <div>
                                    <Recipe
                                        recipe={recipe}
                                        key={index}
                                        toggleShowRecipe={this.toggleShowRecipe}
                                    />
                                </div>
                            </>
                        );
                    })}
                </div>
            );
        }
    }

    render() {
        return <div>{this.renderRecipes()}</div>;
    }
}
