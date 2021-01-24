import { Component } from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";

import RecipesList from "./recipeslist";
import Navbar from "./navbar";
import Searchbar from "./searchbar";
import RestaurantList from './RestaurantList';
import SearchBarYelp from './SearchBarYelp';

import Yelp from './util/yelp';


import './css/app.css';




export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "",
            last: "",
            image: "",
            id: "",
            bio: "",
            recipes: {},
            businesses: []
            // uploaderIsVisible: false
        };
        this.setRecipe = this.setRecipe.bind(this);
        this.searchYelp = this.searchYelp.bind(this);
        // this.toggleUploader = this.toggleUploader.bind(this);
        // this.closeUploader= this.closeUploader.bind(this);
    }

    componentDidMount() {
        console.log("component did mount");

        // axios.get("/user")
        //     .then(({data})=> {
        //         if(data.success){
        //             console.log("data",data);
        //             this.setState({
        //                 success: true,
        //                 id: data.id,
        //                 first: data.first,
        //                 last: data.last,
        //                 image: data.image,
        //                 bio: data.bio,
        //                 uploaderIsVisible: false,
        //             });
        //             console.log("state", this.state);
        //         }
        //         else {
        //             this.setState({
        //                 error: true
        //             });
        //         }
        // });
    }

    setRecipe(data) {
        console.log("new recipe: ", data);
        this.setState({
            recipes: data,
            uploaderIsVisible: false,
        });
    }

    searchYelp(term, location, sortBy) {
        Yelp.search(term, location, sortBy).then(businesses => {
          this.setState({businesses: businesses});
        });
      }

    render() {
        console.log("recipes: ", this.state.recipes);
  
            return (
                <BrowserRouter>
                <>
                    <div className="logo">
                        <img src="/logo.png" alt="" />
                    </div>
                    {/* <Route 
                        render={()=>  <Navbar />  }
                    />       */}
                    <div className="background-image">
                        <Searchbar 
                            setRecipe = {this.setRecipe}
                        />
                        <SearchBarYelp searchYelp={this.searchYelp} />
                    </div>
                     
                    <Route 
                        exact
                        path="/"
                        render={()=>  <RecipesList 
                            setRecipe={this.setRecipe}
                            recipes={this.state.recipes}                       
                        /> }
                    />  
                    <RestaurantList businesses={this.state.businesses} />



        
                      
                </> 
                </BrowserRouter>   
            );   
    }
}
