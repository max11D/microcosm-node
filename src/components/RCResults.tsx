/* eslint-disable no-extra-bind */

import React from 'react';
import {REFINEMENT} from "../enums.js"
import "styles/refinementScreens.scss"
import RCResult from './RCResult';
import Restaurants from '../restaurants.js';
import RestaurantSearch from '../restaurantSearch.js';
import Restaurant from '../restaurant.js';

type RCResultsProps = {
    restaurants: Restaurants,
    restaurantSearch: RestaurantSearch,
    viewRefinement: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    onViewDetails: (name: string) => void
}

export default class RCResults extends React.Component<RCResultsProps, {}> {
    render() {
        let restaurants = this.props.restaurants || [];

        let rs = this.props.restaurantSearch;

        let results = restaurants.filter(rs.restaurantMatches.bind(rs));

        let retval = results.map(function(this: RCResults, r: Restaurant, i: number){
            return <RCResult key={"result_"+i} data={r} onViewDetails={this.props.onViewDetails}/>;
        }.bind(this));

        var vR = this.props.viewRefinement;

        retval.unshift(<div style={{textAlign: "center"}}>
            <div style={{fontSize: "0.9em", marginTop: "0.66em"}}>filter results by</div>
            <button className="orange view-refinement-button" name={REFINEMENT.CUISINE.toString()} onClick={vR}>cuisine</button>
            <button className="orange view-refinement-button" name={REFINEMENT.NEIGHBORHOOD.toString()} onClick={vR}>neighborhood</button>
            <br/>
            <button className="cyan view-refinement-button" name={REFINEMENT.ACCESSIBILITY.toString()} onClick={vR}>accessibility</button>
            <button className="cyan view-refinement-button" name={REFINEMENT.DIET.toString()} onClick={vR}>diet</button>
            <hr/>
        </div>)

        return retval;
    }
}
