import { Component } from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Searchbar from "./searchbar";

import './app.css';

export default function App() {

    const [input, setInput] = useState("");
    
    return (
        <>

            <div>Hello, World!</div>
            <Searchbar />    
        </>    
    );
}