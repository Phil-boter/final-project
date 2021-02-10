import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
import { Component } from "react";

import "./css/SearchBar.css";

export default class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            recipes: [],
            error: false,
        };
        this.sendRecipe = this.sendRecipe.bind(this);
    }

    handleChange(e) {
        console.log("event object name", e.target.name);
        console.log("event object value", e.target.value);
        this.setState(
            {
                input: e.target.value,
            },
            () => console.log("this.state in handleChange", this.state)
        );
    }

    handleClick() {
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
                    this.sendRecipe(data);
                    console.log("state", this.state);
                })
                .catch((error) => {
                    console.log("error in getRecipe", error);
                });
        }
    }

    sendRecipe(data) {
        this.props.setRecipe(data);
    }

    render() {
        return (
            <>
                <div className="SearchBar">
                    <div className="SearchBar-header">
                        <h2>Today I feel like eating...</h2>
                    </div>
                    {this.state.error && (
                        <h3 className="error">
                            Ooops!! Something went wrong...
                        </h3>
                    )}
                    <div className="SearchBar-fields">
                        <input
                            className="field"
                            placeholder="Search for Inspiration"
                            type="text"
                            onChange={(e) => this.handleChange(e)}
                        />
                    </div>
                    <div className="SearchBar-submit">
                        <button
                            type="submit"
                            onClick={() => this.handleClick()}
                        >
                            Go
                        </button>
                    </div>
                    <div className="SearchBar-header next">
                        <div className="SearchBar-next">
                            <h3>Still no Inspiration?</h3>
                        </div>
                    </div>
                    <div className="Switch-container">
                        <Link to="/restaurant">
                            <button className="Switch">
                                Get more Inspiration
                            </button>
                        </Link>
                    </div>
                </div>
            </>
        );
    }
}
