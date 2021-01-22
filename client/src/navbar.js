import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom"
import { BrowserRouter, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import "./navbar.css";

export default function Navbar() {

    return (
        <BrowserRouter>
            <div className="nav-container">
                <div className="logo">
                    <img src="" />
                </div>
                <div>
                    <ul className="nav-links">
                        <li>
                            <Link
                                to="/"
                            >recipes
                            </Link>
                        </li>
                        <li>
                            <a href="/logout">logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </BrowserRouter>
    );
}