import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import "./css/favoriteRecipe.css";

export default class DeleteFavRecipeButtom extends Component {
    constructor() {
        super();
        this.state = {
            delete: false,
            error: false,
        };
    }

    handleDelete() {
        const { id } = this.props.favorite;
        console.log("id delete", { id });
        axios.post("/deleteFavRecipe", { id: id }).then(({ data }) => {
            console.log("data", data);
            if (data.success) {
                this.setState({
                    error: false,
                    delete: true,
                });
            } else {
                this.setState({
                    error: true,
                });
            }
        });
    }
    componentWillUnmount() {}

    render() {
        return (
            <>
                {this.state.delete && <h3 className="error">Recipe deleted</h3>}
                <div className="button-fav back">
                    <button onClick={() => this.handleDelete()}>delete</button>
                </div>
            </>
        );
    }
}
