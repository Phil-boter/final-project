import React from "react";
import { Component } from "react";
import "./css/recipemodal.css"



export default class RestaurantModal extends Component {
componentDidMount() {
    console.log("this.props RestaurantModal", this.props);
}
render() {
    return (
            <>           
                <div className="recipe-modal-container">
                    <div className="recipe-modal-content">
                        
                        <div className="restaurant">
                                <div>           
                                    <p className="recipe-close-modal" onClick={this.props.closeShowRestaurant}>close</p>
                                </div>    
                            <div className="image-container">                   
                                <a href={this.props.business.url} target="_blank"><img className="recipe-modal-image" src={this.props.business.imageSrc} alt="" /></a>
                            </div>    
                            <h2>{this.props.business.name}</h2>
                            {this.props.renderPhone}               
                            <div className="restaurant-information">
                                <div className="restaurant-address">
                                    <p>{this.props.business.address}</p>
                                    <p>{this.props.business.city}</p>
                                    <p>{`${this.props.business.state} ${this.props.business.zipCode}`}</p>
                                </div>
                                <div className="restaurant-reviews">
                                    <h4>{this.props.business.category.toUpperCase()}</h4>
                                    <h4 className="rating">{`${this.props.business.rating} stars`}</h4>
                                    <p>{`${this.props.business.reviewCount} reviews`}</p>
                                </div>
               
                            </div>
                        </div> 
                    </div>
                </div>                    
            </>                
         );
    }
};

