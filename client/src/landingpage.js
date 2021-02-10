import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import Reset from "./reset";
import RecipeList from "./recipelist";
import "./css/app.css";

export default function LandingPage() {
    // no class because no logic
    return (
        <>
            <HashRouter>
                <div className="logo">
                    <img src="/logo.png" alt="" />
                </div>
                <div className="background-image landing">
                    {/* <Route exact path="/" component={RecipeList} /> */}
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset" component={Reset} />
                </div>
            </HashRouter>
        </>
    );
}
