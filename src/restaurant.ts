import CSVToArray from "./utils/CSVToArray";
import FIELD_RECODES from "./fieldRecodes.js"

export default class Restaurant {
    static intFields = Array<number>();
    static intArrFields = Array<number>();
    static strArrFields = Array<number>();
    static headers = Array<string>();

    data: Map<string, any>;
    additionalAltText: Array<string> = new Array<string>();

    configureStatics(parent: any) : Array<string>{
        if (Restaurant.headers.length === 0)
            Restaurant.headers = parent.headers;

        let headers = Restaurant.headers;

        if (Restaurant.intFields.length === 0) {
            Restaurant.intFields = [
                headers.indexOf("Ethnicity"), 
                headers.indexOf("Rating"),
                headers.indexOf("Price"),
                headers.indexOf("Image Count")
            ]
        }

        if (Restaurant.intArrFields.length === 0) {
            Restaurant.intArrFields = [
                headers.indexOf("Dietary Restrictions"),
                headers.indexOf("Establishment Type")
            ];
        }

        if (Restaurant.strArrFields.length === 0) {
            Restaurant.strArrFields = [
                headers.indexOf("Seating"),
                headers.indexOf("Good For"),
                headers.indexOf("Payment Methods")
            ]
        }

        return Restaurant.headers;
    }

    constructor(parent: any, rawData: string) {
        let row = CSVToArray(rawData, ",")[0];
        let headers = this.configureStatics(parent);
        this.data = new Map<string, any>();

        // make sure everything is cast to the correct type, and parse arrays
        headers.forEach((field, i) => {
            if (Restaurant.intFields.includes(i)) {
                this.data.set(field, parseInt(row[i]));
            } else if (Restaurant.intArrFields.includes(i)) {
                let arr = new Array<number>();
                if (row[i])
                    arr = row[i].split(";", 100).map((e) => {return parseInt(e);});
                else
                    arr = [];
                this.data.set(field, arr)
            } else if (Restaurant.strArrFields.includes(i)) {
                this.data.set(field, row[i] ? row[i].split(",") : []);
            } else {
                this.data.set(field, row[i] || "");
            }
        });
    }

    getEthnicity(raw: boolean = false): string {
        if (raw)
            return this.data.get("Ethnicity");
        return FIELD_RECODES["cuisines"][this.data.get("Ethnicity")];
    }

    getDietaryRestrictions(raw: boolean = false): Array<string> {
        if (raw)
            return this.data.get("Dietary Restrictions");
        return this.data.get("Dietary Restrictions").map((x: number) => {
            return FIELD_RECODES["diets"][x];
        });
    }

    getEstablishmentType(raw: boolean = false): string {
        if (raw)
            return this.data.get("Establishment Type");
        return this.data.get("Establishment Type").map((x: number) => {
            return FIELD_RECODES["establishment_types"][x];
        });
    }

    getName(): string { return this.data.get("Name"); }
    getAddress(): string { return this.data.get("Address"); }
    getSeating(): Array<string> { return this.data.get("Seating"); }
    getAccessible(): boolean { return this.data.get("Accessible") === "Y"; }
    getAccessibleSubway(): string { return this.data.get("Accessible Subway"); }
    getRating(): number { return this.data.get("Rating"); }
    getPrice(): number { return this.data.get("Price"); }
    getGoodFor(): Array<string> { return this.data.get("Good For"); }
    getDescription(): string { return this.data.get("Description"); }
    getImageCount(): number { return this.data.get("Image Count"); }
    getFirstImageAlt(): string { return this.data.get("First Image Alt"); }
    getPhone(): string { return this.data.get("Phone"); }
    getWebsite(includeProtocol: boolean = true): string {
        let retval: string = this.data.get("Name"); 

        if (!retval.includes("http"))
            retval = "https://" + retval;

        if (includeProtocol)
            return retval;
        else
            return retval.replace(/^http(s)?:\/\//, "");
    }
    getInstagramHandle(): string { return "@" + this.data.get("Instagram"); }
    getInstagramURL(): string { return "https://www.instagram.com/"+this.data.get("Instagram"); }
    getFacebookURL(): string {
        let retval = this.data.get("Facebook");
        if (retval.includes("https://"))
            return retval;
        else
            return "https://www.facebook.com/" + retval;
    }
    getDelivery(): boolean { return !!this.data.get("Delivery"); }
    getPaymentMethods(): Array<string> { return this.data.get("Payment Methods"); }

    isCashOnly(): boolean {
        let x = this.getPaymentMethods();
        return x.length === 1 && x[0] === "Cash";
    }

    getZipCode(): string {
        let match = this.getAddress().match(/[0-9]{5}$/);
        if (match)
            return match[0];
        return "";
    }

    getNeighborhood(): string {
        let match = this.getAddress().match(/\s+([\w\s]+),\s[\w\s]+[0-9]{5}/);
        if (match && match.length >= 0)
            return match[1];
        return "";
    }

    hasImage(): boolean {
        return this.getImageCount() > 0;
    }

    getAlt(i: number): string {
        if (i === 0)
            return this.getFirstImageAlt();
        else if (i > 0) {
            if (this.additionalAltText.length > i-1)
                return this.additionalAltText[i-1];
            else 
                return "";
        } else {
            return "";
        }
    }
}