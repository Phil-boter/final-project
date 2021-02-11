import { Component } from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import RecipeList from "./recipelist";
// import Navbar from "./navbar";
import Searchbar from "./searchbar";
import RestaurantList from "./RestaurantList";
import SearchBarYelp from "./SearchBarYelp";
import FavoriteRecipe from "./favoriteRecipe";
import Navbar from "./navbar";
import DeleteAccount from "./deleteAccount";

import "./css/app.css";
import "./css/navbar.css";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "",
            last: "",
            image: "",
            id: "",
            bio: "",
            recipes: [],
            businesses: [],
            favoriteRecipe: [],
            showRecipeIsVisible: false,
            navbarIsVisible: false,
        };
        this.setRecipe = this.setRecipe.bind(this);
        // this.searchYelp = this.searchYelp.bind(this);
        this.setRestaurant = this.setRestaurant.bind(this);
        this.closeNavbar = this.closeNavbar.bind(this);
    }

    componentDidMount() {
        console.log("component did mount FAV");

        // axios.get("/getFavoriteRecipe").then(({ data }) => {
        //     if (data.success) {
        //         console.log("data", data);
        //         this.setState({
        //             success: true,
        //             favoriteRecipe: data.favoriteRecipe,
        //         });
        //     } else {
        //         this.setState({
        //             error: true,
        //         });
        //     }
        // });

        axios.get("/user").then(({ data }) => {
            if (data.success) {
                console.log("data", data);
                this.setState({
                    success: true,
                    id: data.id,
                    first: data.first,
                    last: data.last,
                    image: data.image,
                    bio: data.bio,
                    uploaderIsVisible: false,
                });
                console.log("state", this.state);
            } else {
                this.setState({
                    error: true,
                });
            }
        });
    }
    toggleNavbar(e) {
        console.log("click toggle navbar");
        this.setState({
            navbarIsVisible: !this.state.navbarIsVisible,
        });
    }

    closeNavbar(e) {
        console.log("click close navbar");

        this.setState({
            navbarIsVisible: false,
        });
    }

    setRecipe(data) {
        console.log("new recipe: ", data);
        this.setState({
            recipes: data,
            uploaderIsVisible: false,
        });
    }

    setRestaurant(data) {
        console.log("new restaurnat", data);
        this.setState({
            businesses: data,
        });
    }

    render() {
        console.log("state in app: ", this.state);

        return (
            <BrowserRouter>
                <>
                    <div className="nav-container">
                        <div className="logo">
                            <img src="/logo.png" alt="" />
                        </div>
                        <div className="burger-menu">
                            <h2 onClick={(e) => this.toggleNavbar(e)}>|||</h2>
                            {this.state.navbarIsVisible && (
                                <>
                                    <Navbar
                                        closeNavbar={this.closeNavbar}
                                        navbarIsVisible={
                                            this.state.navbarIsVisible
                                        }
                                    />
                                </>
                            )}
                        </div>
                    </div>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <div className="background-image">
                                <Searchbar setRecipe={this.setRecipe} />
                            </div>
                        )}
                    ></Route>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <RecipeList
                                setRecipe={this.setRecipe}
                                recipes={this.state.recipes}
                            />
                        )}
                    ></Route>

                    <Route
                        path="/restaurant"
                        render={() => (
                            <div className="background-image">
                                <SearchBarYelp
                                    setRestaurant={this.setRestaurant}
                                />
                            </div>
                        )}
                    ></Route>
                    <Route
                        path="/restaurant"
                        render={() => (
                            <RestaurantList
                                businesses={this.state.businesses}
                                setRestaurant={this.setRestaurant}
                            />
                        )}
                    ></Route>
                    <Route
                        path="/favoriteRecipe"
                        render={() => (
                            <FavoriteRecipe
                                favoriteRecipe={this.state.favoriteRecipe}
                            />
                        )}
                    ></Route>
                    <Route
                        path="/deleteAccount"
                        render={() => (
                            <div className="background-image">
                                <DeleteAccount
                                    favoriteRecipe={this.state.favoriteRecipe}
                                />
                            </div>
                        )}
                    ></Route>
                </>
            </BrowserRouter>
        );
    }
}
