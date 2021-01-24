import React from "react";
import "./css/list.css";

import Restaurant from "./Restaurant";

export default class RestaurantList extends React.Component {





    renderRestaurant() {
      if(!this.props.businesses){
          return;
      }
      else{
          return (
              <div className="list">
                  {
                      this.props.businesses.map(business => {
                          return <Restaurant business={business} key={business.id} />
                      })
                  }
              </div>
          );
      }
    }


    render() {
        return (
            <div>
                {this.renderRestaurant()}
            </div>
        );
    }
}
