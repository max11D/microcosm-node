import React from 'react'
import RCBasicRefinementScreen, { BasicRefinementScreenProps } from './RCBasicRefinementScreen';
import AccessibilityCodes from '../accessibilityCodes';

export default class RCAccessibilityRefinementScreen extends RCBasicRefinementScreen {
    refinementName = "accessibility"
    header = "Find accessible options"
    placeholder = ""
    explanation = <div>
        <b>Nearby Accessible Subway Station</b> shows establishments with an 
        accessible subway station less than 0.5 kilometers (about 0.3 miles) 
        away. However, please note that we do not track elevator status.
        <br/><br/>
        This filter is a different in that if you select multiple options, an
        establishment must comply with <i>all</i> criteria to be displayed.
    </div>

    getOptions() {
        return Object.entries(AccessibilityCodes).map((x: string[]): string => {return x[1]});
    }
}