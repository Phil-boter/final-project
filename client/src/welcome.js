import React from "react";
import { HashRouter, Route } from "react-router-dom";
import landingSearch from "./landingSearch";
import Registration from "./registration";
import Login from "./login";
import Reset from "./reset";
import "./css/app.css";

export default function Welcome() {
    // no class because no logic
    return (
        <>
            <HashRouter>
                <div className="background-image">
                    <Route exact path="/" component={landingSearch} />
                    <Route path="/registration" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset" component={Reset} />
                </div>
            </HashRouter>
        </>
    );
}
