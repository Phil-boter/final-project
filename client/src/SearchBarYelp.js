import React from "react";
import "./css/SearchBar.css";
import { Link } from "react-router-dom"

export default class SearchBarYelp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            term: "",
            location: "",
            sortBy: "best_match"
        };

        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSortByChange = this.handleSortByChange.bind(this);

        this.sortByOptions = {
            "Best Match": "best_match",
            "Highest Rated": "rating",
            "Most Reviewed": "review_count"
        };
    }

    // getSortByClass(sortByOption) {
    //     if (this.state.sortBy === sortByOption) {
    //         return "active";
    //     }
    //         return "";
    // }

    handleSortByChange(sortByOption) {
        this.setState({sortBy: sortByOption});
    }

    handleTermChange(event) {    

        this.setState({term: event.target.value});
        
    }

    handleLocationChange(event) {

            this.setState({location: event.target.value});
        
    }

    handleSearch(event) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);

        event.preventDefault();
    }

    // renderSortByOptions() {
    //     return Object.keys(this.sortByOptions).map(sortByOption => {
    //         let sortByOptionValue = this.sortByOptions[sortByOption];
    //         return (<li className={this.getSortByClass(sortByOptionValue)}
    //                 key={sortByOptionValue}
    //                 onClick={this.handleSortByChange}>
    //               {sortByOption}
    //               </li>);
    //     });
    // }

    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-header">
                    <h2>Still no Inspiration? Find a restaurant near your place!</h2>
                </div>
                {/* <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div> */}
                <div className="SearchBar-fields">
                    <input className="field-left" placeholder="Search for Restaurants" onChange={this.handleTermChange} />
                    <input className="field-right" placeholder="City and zip-code" onChange={this.handleLocationChange}/>
                </div>
                <div className="SearchBar-submit">
                    <button onClick={this.handleSearch}>Go</button>
                </div >
                <div className="SearchBar-header next">
                    <div className="SearchBar-next" >
                        <h3>Find your Inspiration for cooking!</h3>
                    </div>                    
                    <div>
                        <Link to="/" >
                            <button className="Switch">Get some recipes</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

