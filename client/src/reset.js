import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

import "./css/reset.css";

export default class Reset extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            display: 0,
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

    submitEmail() {
        console.log("click");
        console.log("state submit", this.state);
        axios.post("/password/reset/start", this.state).then(({ data }) => {
            console.log("data", data);
            if (data.success) {
                this.setState({
                    error: false,
                    display: 1,
                });
            } else {
                this.setState({
                    error: true,
                });
            }
        });
    }

    submitCode() {
        console.log("click");
        console.log("state submit", this.state);
        const { code, password, email } = this.state;
        axios
            .post("/password/reset/verify", { code, password, email })
            .then(({ data }) => {
                console.log("data", data);
                if (data.success) {
                    this.setState({
                        error: false,
                        display: 2,
                    });
                } else {
                    this.setState({
                        error: true,
                    });
                }
            });
    }

    getDisplay(display) {
        if (display === 0) {
            return (
                <>
                    {" "}
                    <p className="reset-text">
                        Please enter the email address with which you registered
                    </p>
                    <div className="SearchBar-fields">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={(e) => this.handleChange(e)}
                        ></input>
                    </div>
                    <div className="SearchBar-submit">
                        <button
                            className="reset-button"
                            onClick={() => this.submitEmail()}
                        >
                            Go
                        </button>
                    </div>
                    <div className="SearchBar-header log">
                        <h4 className="SearchBar-next Switch">
                            <Link to="/">Not a member?</Link>
                        </h4>
                    </div>
                </>
            );
        } else if (display === 1) {
            return (
                <>
                    <p className="reset-text">
                        Please enter the code you have received
                    </p>
                    <div className="SearchBar-fields">
                        <input
                            type="text"
                            name="code"
                            placeholder="Code"
                            onChange={(e) => this.handleChange(e)}
                        ></input>
                    </div>
                    <div className="SearchBar-fields">
                        <p className="reset-text">
                            Please enter your new password
                        </p>
                    </div>
                    <div className="SearchBar-fields">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={(e) => this.handleChange(e)}
                        ></input>
                    </div>
                    <div className="SearchBar-submit">
                        <button
                            className="reset-button"
                            onClick={() => this.submitCode()}
                        >
                            Go
                        </button>
                    </div>

                    <div className="SearchBar-header log">
                        <h4 className="SearchBar-next Switch">
                            <Link to="/">Not a member?</Link>
                        </h4>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <p className="reset-text">
                        You have successfully entered your password
                    </p>
                    <div className="SearchBar-fields">
                        <div className="SearchBar-header log">
                            <h4 className="SearchBar-next Switch">
                                <Link to="/login">
                                    You can now login with your new password
                                </Link>
                            </h4>
                        </div>
                    </div>
                </>
            );
        }
    }

    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-header">
                    <h1>Reset Password</h1>
                </div>
                {this.state.error && (
                    <h3 className="error">Ooops!! Something went wrong...</h3>
                )}
                {this.getDisplay(this.state.display)}
            </div>
        );
    }
}
