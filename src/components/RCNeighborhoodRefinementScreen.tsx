import RCBasicRefinementScreen from './RCBasicRefinementScreen';

export default class RCNeighborhoodRefinementScreen extends RCBasicRefinementScreen {
    placeholder = "Today's location..."
    refinementName = "neighborhoods";
    header = "Refine results by neighborhood";

    getOptions(): string[] {
        return this.props.neighborhoods || [];
    }
}
