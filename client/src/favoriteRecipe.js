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
        if (!this.state.favoriteRecipe) {
            return <h2>Sorry there is nothing saved in your favorites-list</h2>;
        } else {
            return (
                <div className="list">
                    {this.state.favoriteRecipe.map((favorite, list) => {
                        console.log("FAV", favorite);
                        return (
                            <div className="fav-ingreds">
                                <div key={list} className="fav-ingreds-label">
                                    <h2>{favorite.label}</h2>
                                    <div className="image-container">
                                        <a href={favorite.url} target="_blank">
                                            <img src={favorite.image} />
                                        </a>
                                    </div>
                                </div>
                                <div className="recipe-information">
                                    <h4>Recipe on:</h4>
                                    <a href={favorite.url}>{favorite.source}</a>
                                </div>
                                <div className="fav-ingreds-list">
                                    <ul className="fav-ingreds-list">
                                        {favorite.ingredient.map(
                                            (list, bucket) => {
                                                console.log("list", list);
                                                return (
                                                    <li key={bucket}>{list}</li>
                                                );
                                            }
                                        )}
                                    </ul>
                                </div>
                                <DeleteFavRecipeButton favorite={favorite} />
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
        return (
            <>
                {/* <div className="button-fav back">
                    <Link to="/">
                        <button>Back</button>
                    </Link>
                </div> */}
                {this.renderFavRec()}
                <div className="button-fav back">
                    <Link to="/">
                        <button>Back</button>
                    </Link>
                </div>
            </>
        );
    }
}
