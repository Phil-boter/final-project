
import React from "react";
import { Component } from "react";
import "./css/Restaurant.css";
import RestaurantModal from "./RestaurantModal"

export default class Restaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            showRecipeIsVisible: false,
        }
        // this.renderPhone = this.renderPhone.bind(this);
        this.closeShowRestaurant = this.closeShowRestaurant.bind(this);
    }
    

    renderPhone() {
        if(!this.props.business.phone){
            return (
              <p>Phone: none provided</p>
            )
        }
        else {
            return (
              <p>Phone: {this.props.business.phone}</p>
            );
        }
    }


    toggleShowRestaurant() {
        console.log("click toggle")
        this.setState({
            showRecipeIsVisible: !this.state.showRecipeIsVisible,
            isVisible: false,
        });
    }

    closeShowRestaurant() {
        console.log("click close uploader")
        this.setState({
            showRecipeIsVisible: false,
        });
    }
  

    render() {
        return (
            <>
                <div className="restaurant" onClick={e => this.toggleShowRestaurant(this.props.business.id)}>
                    <div className="image-container">
                        <img src={this.props.business.imageSrc} alt=""/>
                    </div>
                    <h2>{this.props.business.name}</h2>
                        <div className="recipe-information">
                            <p>Category: {this.props.business.category.toUpperCase()}</p>
                        </div>
                        <div className="recipe-information">
                            <p className="rating">Ratings: {`${this.props.business.rating} stars`}</p>
                        </div>
            
                </div>
                <div>                                         
                    {this.state.showRecipeIsVisible && (
                                            
                        <RestaurantModal
                            business={this.props.business}
                            key={this.props.business.id}
                            closeShowRestaurant={this.closeShowRestaurant}
                            renderPhone={this.renderPhone()}
                        />
                    )}
                </div>
            </>
        );
    }
}


