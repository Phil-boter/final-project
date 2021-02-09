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
                <div>
                    <button onClick={() => this.SaveFavorite()}>
                        Save to favorites
                    </button>
                </div>
            </>
        );
    }
}
