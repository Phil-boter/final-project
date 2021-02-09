import { Component } from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";

import RecipeList from "./recipelist";
import Navbar from "./navbar";
import Searchbar from "./searchbar";
import RestaurantList from "./RestaurantList";
import SearchBarYelp from "./SearchBarYelp";

import "./css/app.css";

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
            showRecipeIsVisible: false,
        };
        this.setRecipe = this.setRecipe.bind(this);
        // this.searchYelp = this.searchYelp.bind(this);
        this.setRestaurant = this.setRestaurant.bind(this);
    }

    componentDidMount() {
        console.log("component did mount");

        // axios.get("/user")
        //     .then(({data})=> {
        //         if(data.success){
        //             console.log("data",data);
        //             this.setState({
        //                 success: true,
        //                 id: data.id,
        //                 first: data.first,
        //                 last: data.last,
        //                 image: data.image,
        //                 bio: data.bio,
        //                 uploaderIsVisible: false,
        //             });
        //             console.log("state", this.state);
        //         }
        //         else {
        //             this.setState({
        //                 error: true
        //             });
        //         }
        // });
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
        console.log("recipes: ", this.state.recipes);

        return (
            <BrowserRouter>
                <>
                    <div className="logo">
                        <img src="/logo.png" alt="" />
                    </div>
                    <Route render={() => <Navbar />} />
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
                </>
            </BrowserRouter>
        );
    }
}
