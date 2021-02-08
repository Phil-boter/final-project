import React from "react";
import { Component } from "react";

import "./css/recipelist.css";
import Restaurant from "./Restaurant";

export default class RestaurantList extends Component {
    renderRestaurant() {
        console.log("props in restaurantList", this.props);
        if (!this.props.businesses.businesses) {
            return;
        } else {
            return (
                <div className="list">
                    {this.props.businesses.businesses.map((business) => {
                        return (
                            <Restaurant
                                business={business}
                                key={business.id}
                                toggleShowRestaurant={this.toggleShowRestaurant}
                            />
                        );
                    })}
                </div>
            );
        }
    }

    render() {
        return <div>{this.renderRestaurant()}</div>;
    }
}
