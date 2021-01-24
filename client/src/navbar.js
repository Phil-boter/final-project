import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom"
import { BrowserRouter, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import "./css/navbar.css";

export default function Navbar() {

    return (
        <BrowserRouter>
     
            <div className="nav-container">
                <div className="logo">
                   <img src="/logo.png" alt="" />
                </div>
            
                <div>
                    <ul className="nav-links">
                        <li>
                            <Link
                                to=".searchbar"
                            >Cart
                            </Link>
                        </li>
                        <li>
                            <Link
                                to=".Searchbar"
                            >Cart
                            </Link>
                        </li>
                        {/* <li>
                            <a href="/logout">logout</a>
                        </li> */}
                    </ul>
                </div>
            </div>
         
        </BrowserRouter>
    );
}