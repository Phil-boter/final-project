import React from "react";
import { HashRouter, Route } from 'react-router-dom';
import Registration from "./registration";
import Login from "./login";
import Reset from "./reset";
import RecipeList from "./recipelist";

export default function LandingPage() { // no class because no logic
    return (
        <>

            <p>hello world</p>

            <HashRouter>
                <div>
                    <Route exact path="/" component={RecipeList} />
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset" component={Reset} />
                </div>
            </HashRouter>

        </>
    )
}