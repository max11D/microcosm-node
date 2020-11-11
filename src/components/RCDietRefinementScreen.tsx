import RCBasicRefinementScreen from './RCBasicRefinementScreen';
import { DietsMap } from '../fieldRecodes';

export default class RCDietRefinementScreen extends RCBasicRefinementScreen {
    values = ["Halal", "Kosher", "Vegan", "Vegetarian"];
    refinementName = "diets";
    placeholder = "your party's needs...";
    header = "Comply with dietary restrictions";

    getOptions() {
        return this.values;
    }
}