import React from "react";
import "./css/SearchBar.css";
import { Link } from "react-router-dom";
import { Component } from "react";
import axios from "./axios";

export default class SearchBarYelp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: "",
            location: "",
            sortBy: "best_match",
            error: false,
        };
        this.sendRestaurant = this.sendRestaurant.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
    }

    handleTermChange(event) {
        this.setState({ term: event.target.value });
    }
    handleLocationChange(event) {
        this.setState({ location: event.target.value });
    }

    handleSearch() {
        console.log("click yelp searchbar");
        console.log("state submit", this.state);
        if (!this.state.term || this.state.term === "") {
            return;
        } else if (!this.state.location || this.state.location === "") {
            return;
        } else {
            axios
                .get(`/api/getRestaurant/`, {
                    params: {
                        term: this.state.term,
                        location: this.state.location,
                        sortBy: "best_match",
                    },
                })
                .then(({ data }) => {
                    console.log("data getRestaurant", data);
                    this.setState({
                        success: true,
                        businesses: data,
                    });
                    this.sendRestaurant(data);
                    console.log("state", this.state);
                })
                .catch((error) => {
                    console.log("error in getRestaurant", error);
                });
        }
    }

    sendRestaurant(data) {
        this.props.setRestaurant(data);
    }

    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-header">
                    <h2>
                        Still no Inspiration? Find a restaurant near your place!
                    </h2>
                </div>
                {this.state.error && (
                    <h3 className="error">Ooops!! Something went wrong...</h3>
                )}
                <div className="SearchBar-fields">
                    <input
                        className="field-left"
                        placeholder="Search for Restaurants"
                        onChange={this.handleTermChange}
                    />
                </div>
                <div className="SearchBar-fields">
                    <input
                        className="field-right"
                        placeholder="City and zip-code"
                        onChange={this.handleLocationChange}
                    />
                </div>
                <div className="SearchBar-submit">
                    <button onClick={() => this.handleSearch()}>Go</button>
                </div>
                <div className="SearchBar-header next">
                    <div className="SearchBar-next">
                        <h3>Find your Inspiration for cooking!</h3>
                    </div>
                </div>
                <div className="Switch-container">
                    <Link to="/">
                        <button className="Switch">Get some recipes</button>
                    </Link>
                </div>
            </div>
        );
    }
}
