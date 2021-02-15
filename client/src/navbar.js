import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import "./css/navbar.css";

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
        };
    }
    componentDidMount() {
        console.log("mount Navbar");
        console.log("props in navbar", this.props);
        console.log("state in navbar", this.state);
    }

    render() {
        return (
            <>
                <div className="recipe-modal-container">
                    <div className="nav-modal-content" id="nav-modal-close">
                        <div>
                            <h2
                                className="close-modal"
                                onClick={this.props.closeNavbar}
                            >
                                X
                            </h2>
                        </div>
                        <div className="nav-links-container">
                            <ul>
                                <li className="nav-link">
                                    <Link
                                        to="/"
                                        className="nav-link"
                                        onClick={this.props.closeNavbar}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-link">
                                    <Link
                                        to="/favoriteRecipe"
                                        className="nav-link"
                                        onClick={this.props.closeNavbar}
                                    >
                                        My Favorite Recipes
                                    </Link>
                                </li>
                                <li className="nav-logout nav-link">
                                    <a href="/logout" className="nav-link">
                                        logout
                                    </a>
                                </li>
                                <li className="nav-delete nav-link">
                                    <Link
                                        to="/deleteAccount"
                                        className="nav-link"
                                        onClick={this.props.closeNavbar}
                                    >
                                        Delete Account
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
