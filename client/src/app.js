import { Component } from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Recipes from "./recipes";
import Navbar from "./navbar";

import './app.css';

export default function App() {

    
    
    return (
        <>
            <Navbar />
            <div>Hello, World!</div>
            <Recipes />    
        </>    
    );
}