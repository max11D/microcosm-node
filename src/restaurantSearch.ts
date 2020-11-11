import AccessibilityCodes, { AccessibilityCodesMap } from "./accessibilityCodes"
import {Cuisines, CuisinesMap, Diets, DietsMap} from "./fieldRecodes";
import Restaurant from "./restaurant";

export class RestaurantSearch {
    protected cuisines: Cuisines[] = [];
    protected neighborhoods: string[] = [];
    protected dietaryRestrictions: Diets[] = [];
    protected accessibility: AccessibilityCodes[] = [];
    protected minRating: number = 1;
    protected maxPrice: number = 5;

    protected accessibilityForSerialization() {
        return this.accessibility.map((x: string) => {
            if (x.match(/subway/i))
                return "subway";
            else
                return "fully";
        })
    }
    
    fromQueryString(location: string) {
        // leading # and ? are included...
        let query: string[] = location ? location.substring(1).split("&") : [];

        if (query.length === 0) return;

        query.forEach(function x(this: RestaurantSearch, x: string, i: number) {
            let tmp: string[] = x.split("=");
            let param = tmp[0].toLowerCase(), value = tmp[1];

            if (param === "cuisines") {
                this.cuisines = [];
                value.split(",").forEach(function(this: RestaurantSearch, x: string): void {
                    let rv: Cuisines | undefined = CuisinesMap[decodeURI(x)];
                    if (rv) this.cuisines.push(rv);
                }.bind(this));
            } else if (param === "neighborhoods") {
                this.neighborhoods = value.split(",").map(decodeURI);
            } else if (param === "dietaryrestrictions") {
                this.dietaryRestrictions = [];
                value.split(",").forEach(function(this: RestaurantSearch, x: string): void {
                    let rv: Diets | undefined = DietsMap[decodeURI(x)];
                    if (rv) this.dietaryRestrictions.push(rv);
                }.bind(this));
            } else if (param === "accessibility") {
                this.accessibility = [];
                if (value.includes("subway"))
                    this.accessibility.push(AccessibilityCodes.SUBWAY);
                if (value.includes("fully"))
                    this.accessibility.push(AccessibilityCodes.FULLY);
            } else if (param === "minRating") {
                this.minRating = parseInt(value);
            } else if (param === "maxPrice") {
                this.maxPrice = parseInt(value);
            }
        }.bind(this));
    }

    constructor(location: string | undefined) {
        if (!location) return;

        this.fromQueryString(location);
    }

    toggleCuisine(value: string | Cuisines) {
        let castValue: Cuisines;
        if (typeof(value) === "string")
            castValue = CuisinesMap[value];
        else
            castValue = value;
        
        let i = this.cuisines.indexOf(castValue);

        if (i < 0)
            this.cuisines.push(castValue)
        else
            this.cuisines.splice(i, 1);
    }

    toggleNeighborhood(value: string) {
        let i = this.neighborhoods.indexOf(value);

        if (i < 0)
            this.neighborhoods.push(value)
        else
            this.neighborhoods.splice(i, 1);
    }

    toggleAccessibilityCode(value: string | AccessibilityCodes) {
        let castValue: AccessibilityCodes;

        if (typeof(value) === "string")
            castValue = AccessibilityCodesMap[value];
        else
            castValue = value;

        let i = this.accessibility.indexOf(castValue);
        
        if (i < 0) 
            this.accessibility.push(castValue)
        else
            this.accessibility.splice(i, 1);
    }

    toggleDietCode(value: string | Diets) {
        let castValue: Diets;

        if (typeof(value) === "string")
            castValue = DietsMap[value];
        else
            castValue = value;

        let i = this.dietaryRestrictions.indexOf(castValue);

        if (i < 0) 
            this.dietaryRestrictions.push(castValue)
        else
            this.dietaryRestrictions.splice(i, 1);
    }

    restaurantMatchesDiet(this: RestaurantSearch, r: Restaurant): boolean {
        let sdr = this.dietaryRestrictions, rdr = r.getDietaryRestrictions();

        if (this.dietaryRestrictions.length === 0)
            return true;
        
        if ((sdr.includes(Diets.VEGAN) || sdr.includes(Diets.VEGETARIAN)) && (rdr.includes("Vegan") || rdr.includes("Vegan Friendly"))) {
            return true;
        } if (sdr.includes(Diets.VEGETARIAN) && (rdr.includes("Vegetarian") || rdr.includes("Vegetarian Friendly"))) {
            return true;
        } if (sdr.includes(Diets.KOSHER) && rdr.includes("Kosher")) {
            return true;
        } if (sdr.includes(Diets.HALAL) && rdr.includes("Halal")) {
            return true;
        }

        return false;
    }

    restaurantMatches(this: RestaurantSearch, r: Restaurant): boolean {
        if (r.getPrice() > this.maxPrice)
            return false;
        if (r.getRating() < this.minRating)
            return false;
        if (this.neighborhoods.length > 0 && !this.neighborhoods.includes(r.getNeighborhood()))
            return false;
        if (this.cuisines.length > 0 && !this.cuisines.includes(CuisinesMap[r.getEthnicity()]))
            return false;
        if (this.accessibility.includes(AccessibilityCodes.FULLY) && !r.getAccessible())
            return false;
        if (this.accessibility.includes(AccessibilityCodes.SUBWAY) && !r.getAccessibleSubway())
            return false;
        return this.restaurantMatchesDiet(r);
    }

    toQueryString() : string {
        let rv: string[] = [];

        if (this.cuisines.length > 0) 
            rv.push("cuisines="+this.cuisines.join(","));
        if (this.neighborhoods.length > 0) 
            rv.push("neighborhoods="+this.neighborhoods.join(","));
        if (this.dietaryRestrictions.length > 0) 
            rv.push("dietaryRestrictions="+this.dietaryRestrictions.join(","));
        if (this.accessibility.length > 0) 
            rv.push("accessibility="+this.accessibilityForSerialization().join(","));
        if (this.minRating > 1) 
            rv.push("minRating="+this.minRating);
        if (this.maxPrice < 5) 
            rv.push("maxPrice="+this.maxPrice);

        if (rv.length > 0)
            return "?" + rv.join("&");
        else
            return "?";
    }

    getSelectedCuisines(): Cuisines[] {
        return this.cuisines.map((x): Cuisines => { return x; });
    }

    getSelectedNeighborhoods(): string[] {
        return this.neighborhoods.map((x): string => { return x; });
    }

    getSelectedAccessibility(): AccessibilityCodes[] {
        return this.accessibility.map((x): AccessibilityCodes => { return x; });
    }

    getSelectedDiets(): Diets[] {
        return this.dietaryRestrictions.map((x): Diets => { return x; });
    }

    clear(s: string): void {
        if (s === "neighborhoods")
            this.clearNeighborhoods();
        else if (s === "cuisines")
            this.clearCuisines();
        else if (s === "accessibility")
            this.clearAccessibility();
        else
            console.error("Invalid category for RestaurantSearch.clear(s: string): "+s.toString())
    }
    clearNeighborhoods() : void { this.neighborhoods = []; }
    clearCuisines() : void { this.cuisines = []; }
    clearAccessibility() : void { this.accessibility = []; }

    clone() : RestaurantSearch {
        return new RestaurantSearch(this.toQueryString());
    }
}

enum ORDER_BY {
    RATING = 1,
    PRICE
}

export default RestaurantSearch;