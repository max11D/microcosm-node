import React from 'react';
import {REFINEMENT} from "../enums.js"
import "styles/refinementScreens.scss"
import RCCuisineRefinementScreen from "./RCCuisineRefinementScreen";
import RefinementFooter from './RCRefinementFooter';
import RCAccessibilityRefinementScreen from "./RCAccessibilityRefinementScreen"
import RestaurantSearch from '../restaurantSearch';
import RCNeighborhoodRefinementScreen from './RCNeighborhoodRefinementScreen';
import RCDietRefinementScreen from './RCDietRefinementScreen';

type RefinementScreenProps = {
    currentRefinement: number,
    restaurantSearch: RestaurantSearch,
    onTick: (e: React.ChangeEvent<HTMLInputElement>) => void,
    neighborhoods: string[],
    onClear: (s: string) => void,
    viewResults: () => void,
    resultCount: number
}

export default class RCRefinementScreens extends React.Component<RefinementScreenProps, {}> {
    render() {
        let retval = null;

        var clearFx = this.props.onClear;
        var boundClearFx: null | (() => void) = null;

        if (this.props.currentRefinement === REFINEMENT.CUISINE) {
            retval = <RCCuisineRefinementScreen key="r" 
                selected={this.props.restaurantSearch.getSelectedCuisines()} 
                onTick={this.props.onTick}/>;
            boundClearFx = () => { clearFx("cuisines"); }
        } else if (this.props.currentRefinement === REFINEMENT.NEIGHBORHOOD) {
            retval = <RCNeighborhoodRefinementScreen key="r"
                selected={this.props.restaurantSearch.getSelectedNeighborhoods()} 
                onTick={this.props.onTick}
                neighborhoods={this.props.neighborhoods}/>;
            boundClearFx = () => { clearFx("neighborhoods"); }
        } else if (this.props.currentRefinement === REFINEMENT.ACCESSIBILITY) {
            retval = <RCAccessibilityRefinementScreen key="r"
                selected={this.props.restaurantSearch.getSelectedAccessibility()} 
                onTick={this.props.onTick}/>;
            boundClearFx = () => { clearFx("accessibility"); }
        } else if (this.props.currentRefinement === REFINEMENT.DIET) {
            retval = <RCDietRefinementScreen key="r"
                selected = {this.props.restaurantSearch.getSelectedDiets()}
                onTick={this.props.onTick}/>
            boundClearFx = () => { clearFx("diets") }
        }
        return [retval, <RefinementFooter key="f"
            viewResults={this.props.viewResults}
            onClear={boundClearFx || (() => {})}
            resultCount={this.props.resultCount}/>];
    }
}