/* eslint-disable no-extra-bind */

import React from 'react';
import {REFINEMENT} from "../enums.js"
import "styles/refinementScreens.scss"
import RCResult from './RCResult';
import Restaurant from '../restaurant.js';
import RestaurantSearch from '../restaurantSearch.js';

type RCResultsProps = {
    restaurants: Restaurant[],
    viewRefinement: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    onViewDetails: (name: string) => void,
    restaurantSearch: RestaurantSearch
}

export default class RCResults extends React.Component<RCResultsProps, {}> {
    render() {
        let restaurants = this.props.restaurants || [];

        let retval = restaurants.map(function(this: RCResults, r: Restaurant, i: number){
            return <RCResult key={"result_"+i} data={r} onViewDetails={this.props.onViewDetails}/>;
        }.bind(this));

        var vR = this.props.viewRefinement;
        let rs = this.props.restaurantSearch;

        let showCounter = (n: number) : JSX.Element | null => {
            return  (n > 0 ? <span>({n})</span> : null);
        }

        retval.unshift(<div style={{textAlign: "center"}}>
            <div style={{fontSize: "0.9em", marginTop: "0.66em"}}>filter results by</div>
            <button className="orange view-refinement-button" name={REFINEMENT.CUISINE.toString()} onClick={vR}>
                cuisine {showCounter(rs.getSelectedCuisines().length)}
            </button>
            <button className="orange view-refinement-button" name={REFINEMENT.NEIGHBORHOOD.toString()} onClick={vR}>
                neighborhood {showCounter(rs.getSelectedNeighborhoods().length)}
            </button>
            <br/>
            <button className="cyan view-refinement-button" name={REFINEMENT.ACCESSIBILITY.toString()} onClick={vR}>
                accessibility {showCounter(rs.getSelectedAccessibility().length)}
            </button>
            <button className="cyan view-refinement-button" name={REFINEMENT.DIET.toString()} onClick={vR}>
                diet 
            </button>
            <hr/>
        </div>)

        return retval;
    }
}
