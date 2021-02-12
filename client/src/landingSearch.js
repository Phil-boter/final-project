import { Component } from "react";
import axios from "./axios"; // in react it is not globally available
import { Link } from "react-router-dom";

import "./css/app.css";
import "./css/SearchBar.css";
import "./css/landing-nav.css";
import "./css/landingsearch.css";
import "./css/recipemodal.css";

export default class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            recipes: [],
            error: false,
        };
        this.renderCautions = this.renderCautions.bind(this);
        this.renderTime = this.renderTime.bind(this);
    }

    renderTime(recipe) {
        console.log("recipe.recipe", recipe.recipe);
        if (!recipe.recipe.totalTime || recipe.recipe.totalTime === "0") {
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
                    <p>{`${recipe.recipe.totalTime} min`}</p>
                </>
            );
        }
    }

    renderCautions(recipe) {
        if (!recipe.recipe.cautions || recipe.recipe.cautions.length == "0") {
            return;
        } else {
            return (
                <>
                    <h4>Cautions:</h4>
                    <p>{` ${recipe.recipe.cautions} `} </p>
                </>
            );
        }
    }

    componentDidMount() {
        console.log("state in registration", this.state);
        console.log("props in regsitration", this.props);
    }

    handleChange(e) {
        // e-- event Object to handle th users input from "name" property of event-object
        console.log("event object name", e.target.name);
        console.log("event object value", e.target.value);
        this.setState(
            {
                [e.target.name]: e.target.value, // [] tells setState thate.target.name is a variable
            },
            () => console.log("this.state in handleChange", this.state) // because setState is asyncronous
        );
    }

    handleSearch(e) {
        console.log("event object name", e.target.name);
        console.log("event object value", e.target.value);
        this.setState(
            {
                input: e.target.value,
            },
            () => console.log("this.state in handleChange", this.state)
        );
    }

    handleSubmit() {
        console.log("click");
        console.log("state submit", this.state);
        if (!this.state.input || this.state.input === "") {
            return;
        } else {
            axios
                .get(`/api/getRecipe/` + this.state.input)
                .then(({ data }) => {
                    console.log("data getRecipe", data);
                    this.setState({
                        success: true,
                        recipes: { data },
                    });
                    // this.sendRecipe(data);
                    console.log("state", this.state);
                })
                .catch((error) => {
                    console.log("error in getRecipe", error);
                });
        }
    }

    renderRecipes() {
        if (!this.state.recipes.data) {
            console.log("return", this.state);

            return;
        } else {
            console.log("recipes in render", this.state.recipes.data.recipes);
            return (
                <div className="list">
                    {this.state.recipes.data.recipes.map((recipe, index) => {
                        console.log("recipe", recipe);
                        return (
                            <>
                                <div>
                                    <div className="restaurant" key={index}>
                                        <div className="image-container">
                                            <div>
                                                <a
                                                    href={recipe.recipe.url}
                                                    target="_blank"
                                                    className="recipe-modal-image"
                                                >
                                                    <img
                                                        className="recipe-modal-image"
                                                        src={
                                                            recipe.recipe.image
                                                        }
                                                        alt=""
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                        <h2>{recipe.recipe.label}</h2>
                                        <ul>
                                            {recipe.recipe.ingredients.map(
                                                (ingredient, list) => (
                                                    <li key={list}>
                                                        {ingredient.text}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                        <div className="recipe-information">
                                            <h4>Recipe on:</h4>
                                            <a
                                                href={recipe.recipe.url}
                                                target="_blank"
                                            >
                                                {recipe.recipe.source}
                                            </a>
                                        </div>
                                        <div className="recipe-information">
                                            {this.renderTime(recipe)}
                                        </div>
                                        <div className="recipe-information">
                                            {this.renderCautions(recipe)}
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </div>
            );
        }
    }

    render() {
        return (
            <>
                <div className="nav-landing-container">
                    <div className="logo">
                        <img src="/logo.png" alt="" />
                    </div>

                    <div className="landing-link">
                        <h2>
                            <Link to="/login">login </Link>
                        </h2>
                    </div>
                </div>
                <div className="SearchBar">
                    <div className="SearchBar-header register">
                        <h1>EL JEFFE</h1>
                    </div>
                    <div className="landing-header">
                        <h2>what would I like to eat today?</h2>
                    </div>
                    <div className="landing-header">
                        <h2>get inspiration with EL JEFFE</h2>
                    </div>

                    {this.state.error && (
                        <h3 className="error">
                            Ooops!! Something went wrong...
                        </h3>
                    )}
                    <div className="SearchBar-fields">
                        <input
                            className="field"
                            placeholder="Pasta, Burger or Poke Bowl?"
                            type="text"
                            onChange={(e) => this.handleSearch(e)}
                        />
                    </div>
                    <div className="SearchBar-submit">
                        <button
                            type="submit"
                            onClick={() => this.handleSubmit()}
                        >
                            Go
                        </button>
                    </div>
                    <div className="SearchBar-header log">
                        <h1>Get more fantastic features after Registration!</h1>
                        <h4 className="SearchBar-next Switch">
                            <Link to="/registration">Registration</Link>
                        </h4>
                    </div>
                    <div className="render-recipe">{this.renderRecipes()}</div>
                </div>
            </>
        );
    }
}
