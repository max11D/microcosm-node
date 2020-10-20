import Restaurant from "./restaurant"

export default class Restaurants {
    readonly headers: Array<string>;
    protected readonly rows: Array<Restaurant>;
    readonly neighborhoods: Array<string>;

    constructor(rawCSV: string) {
        let csv = rawCSV.split("\n")
        this.headers = csv[0].split(",");
        let length = csv.length-1;
        let rows: Restaurant[] = new Array(length);
        let ns = new Set<string>();

        for (let i = 0; i < length-1; i++) {
            let r = new Restaurant(this, csv[i+1]);
            rows[i] = r;   
            ns.add(r.getNeighborhood());
        }
        
        this.neighborhoods = Array.from(ns).sort();
        this.rows = rows;
    }

    filter(fx: (value: Restaurant, index: number, array: Restaurant[]) => boolean) {
        return this.rows.filter(fx);
    }

    get(name: string): Restaurant | null {
        for (let i = this.rows.length - 2; i >= 0; i--) {
            // TODO the last row is null and needs to be fixed
            if (this.rows[i].getName() === name) {
                return this.rows[i];
            }
        }
        return null;
    }
}