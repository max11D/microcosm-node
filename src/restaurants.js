import FIELD_RECODES from "./fieldRecodes.js"
import CSVToArray from "utils/JSCSVToArray.js"
import Restaurant from "restaurant"

export default class Restaurants {
    constructor(csv) {
        csv = csv.split("\n")
        this.headers = csv[0].split(",");
        let length = csv.length-1;
        this.rows = new Array(length);
        let neighborhoods = new Set();

        for (let i = 0; i < length-1; i++) {
            let r = new Restaurant(this, csv[i+1]);
            this.rows[i] = r;   
            neighborhoods.add(r.getNeighborhood());
        }

        this.neighborhoods = Array.from(neighborhoods).sort();
    }

    filter(fx) {
        return this.rows.filter(fx);
    }
}