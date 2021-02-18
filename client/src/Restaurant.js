import React from "react";
import { Component } from "react";
import "./css/Restaurant.css";
import RestaurantModal from "./RestaurantModal";

export default class Restaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            showRecipeIsVisible: false,
        };

        this.closeShowRestaurant = this.closeShowRestaurant.bind(this);
    }
    componentDidMount() {
        console.log("props in restaurant", this.props.business);
    }
    renderPhone(phone) {
        if (!phone) {
            return (
                <>
                    <p>Phone:</p>
                    <p>none provided</p>
                </>
            );
        } else {
            return (
                <>
                    <h4>Phone:</h4>
                    {phone}
                </>
            );
        }
    }
    renderPrice(price) {
        if (!price) {
            return;
        } else {
            return (
                <>
                    <h4>Price:</h4>
                    {price}
                </>
            );
        }
    }

    toggleShowRestaurant() {
        console.log("click toggle");
        this.setState({
            showRecipeIsVisible: !this.state.showRecipeIsVisible,
            isVisible: false,
        });
    }

    closeShowRestaurant() {
        console.log("click close uploader");
        this.setState({
            showRecipeIsVisible: false,
        });
    }

    render() {
        return (
            <>
                <div
                    className="restaurant"
                    onClick={(e) =>
                        this.toggleShowRestaurant(this.props.business.id)
                    }
                >
                    <div className="image-container">
                        <img src={this.props.business.image_url} alt="" />
                    </div>
                    <h2>{this.props.business.name}</h2>
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
                        <h4 className="rating">Rating:</h4>
                        <p>{`${this.props.business.rating} stars`}</p>
                    </div>
                </div>
                <div>
                    {this.state.showRecipeIsVisible && (
                        <RestaurantModal
                            business={this.props.business}
                            key={this.props.business.id}
                            closeShowRestaurant={this.closeShowRestaurant}
                            renderPhone={this.renderPhone(
                                this.props.business.phone
                            )}
                            renderPrice={this.renderPrice(
                                this.props.business.price
                            )}
                        />
                    )}
                </div>
            </>
        );
    }
}
