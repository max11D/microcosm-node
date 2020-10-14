import React from 'react';
import {REFINEMENT} from "../enums.js"
import "styles/refinementScreens.scss"
import RCNeighborhoodRefinementScreen from './RCNeighborhoodRefinementScreen';
import RCCuisineRefinementScreen from "./RCCuisineRefinementScreen";
import RefinementFooter from './RefinementFooter';
import RCAccessibilityRefinementScreen from "./RCAccessibilityRefinementScreen.js"

export default class RCRefinementScreens extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tagMatcher: "" }
    }

    onTextUpdate(e) {
        this.setState({tagMatcher: e.target.value})
    }

    render() {
        let retval = null;

        var clearFx = this.props.onClear;
        var boundClearFx = null;

        if (this.props.currentRefinement === REFINEMENT.CUISINE) {
            retval = <RCCuisineRefinementScreen key="r" 
                refinements={this.props.refinements} 
                onTick={this.props.onTick}/>;
            boundClearFx = () => { clearFx("cuisines"); }
        } else if (this.props.currentRefinement === REFINEMENT.NEIGHBORHOOD) {
            retval = <RCNeighborhoodRefinementScreen key="r"
                refinements={this.props.refinements}
                onTick={this.props.onTick}
                neighborhoods={this.props.neighborhoods}/>;
            boundClearFx = () => { clearFx("neighborhoods"); }
        } else if (this.props.currentRefinement === REFINEMENT.ACCESSIBILITY) {
            retval = <RCAccessibilityRefinementScreen key="r"
                refinements={this.props.refinements}
                onTick={this.props.onTick}/>;
            boundClearFx = () => { clearFx("accessibility"); }
        }
        return [retval, <RefinementFooter key="f"
            viewResults={this.props.viewResults}
            onClear={boundClearFx}/>];
    }
}