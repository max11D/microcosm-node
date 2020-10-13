import React from 'react'
import RCBasicRefinementScreen from './RCBasicRefinementScreen.js';
import ACCESSIBILITY_CODES from "accessibilityCodes.js";

export default class RCAccessibilityRefinementScreen extends RCBasicRefinementScreen {
    constructor(props) {
        super(props);
        this.refinementName = "accessibility";
        this.header = "Find accessible options";
        this.explanation = <div>
            <b>Nearby Accessible Subway Station</b> shows establishments with an 
            accessible subway station less than 0.5 kilometers (about 0.3 miles) 
            away. However, please note that we do not track elevator status.
            <br/><br/>
            This filter is a different in that if you select multiple options, an
            establishment must comply with <i>all</i> criteria to be displayed.
        </div>
    }

    getOptions() {
        return ACCESSIBILITY_CODES
    }
}