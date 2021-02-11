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
        // this.closeNavbar = this.closeNavbar.bind(this);
    }
    componentDidMount() {
        console.log("mount Navbar");
        console.log("props in navbar", this.props);
        console.log("state in navbar", this.state);
    }

    // closeNavbar() {
    //     console.log("click close navbar");

    //     this.setState({
    //         navbarIsVisible: false,
    //     });
    // }

    render() {
        return (
            <>
                <div className="recipe-modal-container">
                    <div className="nav-modal-content">
                        <div>
                            <h2
                                className="close-nav"
                                onClick={this.props.closeNavbar}
                            >
                                X
                            </h2>
                        </div>
                        <div className="nav-links-container">
                            <ul className="nav-links-líst">
                                <li className="nav-link">
                                    <Link to="/">
                                        <h2>Home</h2>
                                    </Link>
                                </li>
                                <li className="nav-link">
                                    <Link to="/favoriteRecipe">
                                        <h2>My Favorite Recipes</h2>
                                    </Link>
                                </li>
                                <li className="nav-logout">
                                    <a href="/logout">
                                        <h2>logout</h2>
                                    </a>
                                </li>
                                <li className="nav-delete">
                                    <Link to="/deleteAccount">
                                        <h2>Delete Account</h2>
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
