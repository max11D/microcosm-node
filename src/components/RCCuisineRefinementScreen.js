import RCBasicRefinementScreen from './RCBasicRefinementScreen.js';
import FIELD_RECODES from "fieldRecodes.js"

export default class RCCuisineRefinementScreen extends RCBasicRefinementScreen {
    constructor(props) {
        super(props);
        this.refinementName = "cuisines";
        this.header = "Refine results by cuisine";
        this.placeholder = "Today's craving..."
    }

    getOptions() {
        return FIELD_RECODES.cuisines;
    }
}