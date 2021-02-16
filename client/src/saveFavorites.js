import React, { Component } from "react";
import "./css/savefavorites.css";
import axios from "./axios";

export default class SaveFavorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            recipe: this.props.recipe.recipe,
            ingredient: this.props.recipe.recipe.ingredientLines,
            healthLabels: this.props.recipe.recipe.healthLabels,
            cautions: this.props.recipe.recipe.cautions,
        };
    }

    componentDidMount() {
        console.log("component did mount saveFavorites");
    }

    SaveFavorite() {
        console.log("click in save favorite");
        console.log("state saveFavorite", this.state);
        axios
            .post("/saveFavorite", {
                recipe: this.state.recipe,
                ingredient: this.state.ingredient,
                healthLabels: this.state.healthLabels,
                cautions: this.state.cautions,
            })
            .then((res) => {
                if (res) {
                    console.log("res saveFav", res);
                } else {
                    this.setState({
                        error: true,
                    });
                }
            });
    }

    render() {
        return (
            <>
                <div className="button-save save">
                    <button
                        className="save"
                        onClick={() => this.SaveFavorite()}
                    >
                        Save to favorites
                    </button>
                </div>
            </>
        );
    }
}
