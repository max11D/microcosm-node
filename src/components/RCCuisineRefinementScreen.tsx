import RCBasicRefinementScreen from './RCBasicRefinementScreen';
import { CuisinesMap } from '../fieldRecodes';

export default class RCCuisineRefinementScreen extends RCBasicRefinementScreen {
    values = Object.keys(CuisinesMap);
    placeholder = "Today's craving..."
    refinementName = "cuisines";
    header = "Refine results by cuisine";

    getOptions() {
        return this.values;
    }
}