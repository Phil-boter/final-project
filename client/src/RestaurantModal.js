import React from "react";
import { Component } from "react";
import "./css/recipemodal.css";
import "./css/Restaurant.css";

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
                                <p
                                    className="recipe-close-modal"
                                    onClick={this.props.closeShowRestaurant}
                                >
                                    close
                                </p>
                            </div>
                            <div>
                                <a
                                    href={this.props.business.url}
                                    target="_blank"
                                    className="recipe-modal-image"
                                >
                                    <img
                                        className="recipe-modal-image"
                                        src={this.props.business.image_url}
                                        alt=""
                                    />
                                </a>
                            </div>
                            <h2>{this.props.business.name}</h2>

                            <div className="recipe-information">
                                {" "}
                                {this.props.renderPhone}
                            </div>
                            <div className="restaurant-address">
                                <h4>Address:</h4>
                                <ul>
                                    <li>
                                        {this.props.business.location.address1}
                                    </li>
                                    <li>{this.props.business.location.city}</li>
                                    <li>{`${this.props.business.location.state} ${this.props.business.location.zip_code}`}</li>
                                </ul>
                            </div>
                            <div className="recipe-information">
                                <h4>Category:</h4>
                                <ul>
                                    {this.props.business.categories.map(
                                        (category, index) => {
                                            return (
                                                <div key={index}>
                                                    <li>{category.title}</li>
                                                </div>
                                            );
                                        }
                                    )}
                                </ul>
                            </div>
                            <div className="recipe-information">
                                {this.props.renderPrice}
                            </div>
                            <div className="recipe-information">
                                <h4>Rating:</h4>
                                {`${this.props.business.rating} stars`}
                            </div>
                            <div className="recipe-information">
                                <h4>Reviews:</h4>
                                <a
                                    href={this.props.business.url}
                                    target="_blank"
                                >
                                    {`${this.props.business.review_count} reviews`}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
