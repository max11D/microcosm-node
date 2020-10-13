import RCBasicRefinementScreen from './RCBasicRefinementScreen.js';

export default class RCNeighborhoodRefinementScreen extends RCBasicRefinementScreen {
    constructor(props) {
        super(props);
        this.refinementName = "neighborhoods";
        this.header = "Refine results by neighborhood";
        this.placeholder = "Today's location...";
    }

    getOptions() {
        return this.props.neighborhoods;
    }
}
