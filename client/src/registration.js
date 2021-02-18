import { Component } from "react";
import axios from "./axios"; // in react it is not globally available
import { Link } from "react-router-dom";

import "./css/registration.css";

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            error: false,
        };
    }

    componentDidMount() {
        console.log("state in registration", this.state);
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
        axios.post("/registration", this.state).then(({ data }) => {
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
                            <Link to="/login">login </Link>
                        </h2>
                    </div>
                </div>
                <div className="SearchBar">
                    <div className="landing-header">
                        <h2>regsitration</h2>
                    </div>
                    <div className="SearchBar-header register">
                        <h1>EL JEFFE</h1>
                    </div>

                    {this.state.error && (
                        <h3 className="error">
                            Ooops!! Something went wrong...
                        </h3>
                    )}
                    <div>
                        <div className="reg">
                            <input
                                className="field-left"
                                type="text"
                                name="first"
                                placeholder="First name"
                                onChange={(e) => this.handleChange(e)}
                            ></input>

                            <input
                                className="field-right"
                                type="text"
                                name="last"
                                placeholder="Last name"
                                onChange={(e) => this.handleChange(e)}
                            ></input>
                        </div>
                        <div className="reg">
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
                    </div>
                    <div className="SearchBar-submit landing">
                        <button
                            className="reg-button"
                            onClick={() => this.handleClick()}
                        >
                            Go
                        </button>
                    </div>
                </div>
            </>
        );
    }
}
