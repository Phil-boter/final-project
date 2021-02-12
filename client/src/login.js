import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

import "./css/SearchBar.css";
import "./css/login.css";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    handleChange(e) {
        console.log("event object name", e.target.name);
        console.log("event object value", e.target.value);
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state in handleChange", this.state)
        );
    }

    handleClick() {
        console.log("click");
        console.log("state submit", this.state);
        axios.post("/login", this.state).then(({ data }) => {
            console.log("data", data);
            if (data.success) {
                location.replace("/");
            } else {
                this.setState({
                    error: true,
                });
            }
        });
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
                            <Link to="/"> home</Link>
                        </h2>
                        <h2>
                            <Link to="/registration"> registration</Link>
                        </h2>
                    </div>
                </div>
                <div className="SearchBar">
                    <div className="landing-header">
                        <h2>login</h2>
                    </div>
                    <div className="SearchBar-header register">
                        <h1>EL JEFFE</h1>
                    </div>
                    {this.state.error && (
                        <h3 className="error">
                            Ooops!! Something went wrong...
                        </h3>
                    )}
                    <div className="SearchBar-fields">
                        <input
                            className="field-left"
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={(e) => this.handleChange(e)}
                        ></input>
                        <input
                            className="field-right"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={(e) => this.handleChange(e)}
                        ></input>
                    </div>
                    <div className="SearchBar-submit">
                        <button
                            className="login-button"
                            onClick={() => this.handleClick()}
                        >
                            Go
                        </button>
                    </div>
                    <div className="SearchBar-header log">
                        <h4 className="SearchBar-next Switch">
                            <Link to="/reset">Forgot your password?</Link>
                        </h4>
                    </div>
                </div>
            </>
        );
    }
}
