import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import "./css/favoriteRecipe.css";
import DeleteFavRecipeButton from "./deleteFavrecipeButton";

export default class FavoriteRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
        };
    }
    componentDidMount() {
        console.log("component did mount favorite");
        console.log("state in favoriteRecipe", this.state);
        axios.get("/getFavoriteRecipe").then(({ data }) => {
            if (data.success) {
                console.log("data", data);
                this.setState({
                    success: true,
                    favoriteRecipe: data.favoriteRecipe,
                });
            } else {
                this.setState({
                    error: true,
                });
            }
        });
    }

    renderFavRec() {
        console.log("props in renderFavRec", this.state);
        if (
            !this.state.favoriteRecipe ||
            this.state.favoriteRecipe.length == "0"
        ) {
            console.log("if");
            return (
                <div className="no-recipe">
                    <h2>Sorry there is nothing saved in your favorites-list</h2>
                </div>
            );
        } else {
            return (
                <div className="list Fav-List">
                    {this.state.favoriteRecipe.map((favorite, list) => {
                        console.log("FAV", favorite);
                        return (
                            <div key={list} className="fav-ingreds">
                                <div className="fav-ingreds-label">
                                    <h2>{favorite.label}</h2>
                                    <div className="image-container">
                                        <a href={favorite.url} target="_blank">
                                            <img src={favorite.image} />
                                        </a>
                                    </div>
                                </div>
                                <div className="recipe-information">
                                    <h4>Recipe on :</h4>
                                    <a href={favorite.url} target="_blank">
                                        {favorite.source}
                                    </a>
                                </div>
                                <div className="recipe-information">
                                    <h4>Feeds :</h4>
                                    {`${favorite.yield} persons`}
                                </div>
                                <div className="fav-ingreds-list">
                                    <h4>Shopping list :</h4>
                                    <ul className="fav-ingreds-list">
                                        {favorite.ingredient.map(
                                            (list, bucket) => {
                                                console.log("list", list);
                                                return (
                                                    <div key={bucket}>
                                                        <li>{list}</li>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </ul>
                                </div>
                                <div className="fav-ingreds-list">
                                    <h4>Healthlabels :</h4>

                                    <ul className="fav-ingreds-list">
                                        {favorite.healthlabels.map(
                                            (label, list) => {
                                                console.log("label", label);
                                                return (
                                                    <div key={list}>
                                                        <li>{label}</li>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </ul>
                                </div>
                                <div className="button-fav">
                                    <div className="back">
                                        <DeleteFavRecipeButton
                                            favorite={favorite}
                                        />
                                    </div>
                                    <div className="back">
                                        <Link to="/">
                                            <button>Back</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }
    }

    render() {
        console.log("props in FAV", this.props);
        console.log("this.state in FAV", this.state);
        return <>{this.renderFavRec()}</>;
    }
}
