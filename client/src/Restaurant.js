
import React from "react";
import "./css/Restaurant.css";

export default class Restaurant extends React.Component {
  render() {
    return (
      <div className="restaurant">
        <div className="image-container">
          <img src={this.props.business.imageSrc} alt=""/>
        </div>
        <h2>{this.props.business.name}</h2>
        <div className="restaurant-information">
          <div className="restaurant-address">
            <p>{this.props.business.address}</p>
            <p>{this.props.business.city}</p>
            <p>{`${this.props.business.state} ${this.props.business.zipCode}`}</p>
          </div>
          <div className="restaurant-reviews">
            <h3>{this.props.business.category.toUpperCase()}</h3>
            <h3 className="rating">{`${this.props.business.rating} stars`}</h3>
            <p>{`${this.props.business.reviewCount} reviews`}</p>
          </div>
        </div>
      </div>
    );
  }
}


