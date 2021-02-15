import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class DeleteAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
        };
    }
    componentDidMount() {
        console.log("mount delete Account");
        console.log("props in delete Account", this.props);
        console.log("state in delete Account", this.state);
    }

    handleClick() {
        console.log("click in delete Account");
        axios
            .post("/deleteAccount")
            .then(() => {
                this.setState({
                    success: true,
                });
            })
            .catch((error) => {
                console.log("error in delete account", error);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        return (
            <>
                <div className="SearchBar">
                    <div className="SearchBar-header">
                        <h2>are you sure you want to delete your account?</h2>
                    </div>
                    {this.state.error && (
                        <h3 className="error">
                            Ooops!! Something went wrong...
                        </h3>
                    )}
                    <div className="Switch-container">
                        <a href="/landingSearch">
                            <button
                                onClick={() => this.handleClick()}
                                className="Switch"
                            >
                                DELETE
                            </button>
                        </a>
                    </div>
                    <div className="Switch-container">
                        <Link to="/">
                            <button className="Switch">Back to Homepage</button>
                        </Link>
                    </div>
                </div>
            </>
        );
    }
}
