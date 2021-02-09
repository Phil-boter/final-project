import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class FavoriteRecipe extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }
    componentDidMount() {
        console.log("component did mount favorite");
        console.log("props in favoriteRecipe", this.props);
    }

    // handleClick() {
    //     console.log("click");
    //     console.log("state submit", this.state);
    //     axios.post("/login", this.state).then(({ data }) => {
    //         console.log("data", data);
    //         if (data.success) {
    //             location.replace("/");
    //         } else {
    //             this.setState({
    //                 error: true,
    //             });
    //         }
    //     });
    // }

    renderFavRec() {
        console.log("props in renderFavRec", this.props);
        if (!this.props.favoriteRecipe) {
            return <h2>Sorry there is nothing saved in your favorites-list</h2>;
        } else {
            return (
                <div className="list">
                    {this.props.favoriteRecipe.map((favorite, index) => {
                        console.log("FAV", favorite);
                        return (
                            <div key={index}>
                                <h2>{favorite.label}</h2>
                                <img src={favorite.image} />
                                <li>{favorite.ingredient}</li>
                            </div>
                        );
                    })}
                    {/* <ol> */}
                    {/* <li>{this.props.favoriteRecipe.ingredient}</li> */}

                    {/* .map(
                            (ingred, list) => {
                                console.log("FAV ingredient", ingred);
                                return <li key={list}>{ingred}</li>;
                            }
                        )} */}
                    {/* </ol> */}
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
