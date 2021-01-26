
import React from "react";
import "./css/Restaurant.css";

export default class Restaurant extends React.Component {

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

  

    render() {
        return (
            <div className="restaurant">
                <div className="image-container">
                    <a href={this.props.business.url} target="_blank"><img src={this.props.business.imageSrc} alt=""/></a>
                </div>
                <h2>{this.props.business.name}</h2>
                {this.renderPhone()}
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
        );
    }
}


