import FIELD_RECODES from "./fieldRecodes.js"
import CSVToArray from "utils/CSVToArray.js"

export default class Restaurants {
    constructor(csv) {
        csv = csv.split("\n")
        this.headers = csv[0].split(",");
        let length = csv.length-1;
        this.rows = new Array(length);
        let neighborhoods = new Set();

        let recodes = [
            this.headers.indexOf("Ethnicity"), 
            this.headers.indexOf("Rating"),
            this.headers.indexOf("Price")
        ];

        let arrRecodes = [
            this.headers.indexOf("Dietary Restrictions"),
            this.headers.indexOf("Establishment Type")
        ]

        this.headers.forEach(function(f, i) {
            if (f === "Ethnicity") {
                this.getEthnicity = function(j){
                    return FIELD_RECODES["cuisines"][this.rows[j][i]];
                }.bind(this);
            } else if (f === "Dietary Restrictions") {
                this.getDietaryRestrictions = function(j){
                    return this.rows[j][i].map((x) => {return FIELD_RECODES["diets"][x]});
                }.bind(this);
            } else if (f === "Establishment Type") {
                this.getEstablishmentType = function(j){
                    return this.rows[j][i].map((x) => {return FIELD_RECODES["establishment_types"][x]});
                }.bind(this);
            } else {
                var fx = "get" + f.replace(" ", "");
                
                this[fx] = function(j) {
                    return this.rows[j][i];
                }.bind(this)
            }
        }.bind(this))

        let goodForIndex = this.headers.indexOf("Good For"),
            seatingIndex = this.headers.indexOf("Seating"),
            accessIndex = this.headers.indexOf("Accessible");

        for (let i = 0; i < length-1; i++) {
            this.rows[i] = CSVToArray(csv[i+1])[0];
            
            recodes.forEach(function(n) {
                this.rows[i][n] = parseInt(this.rows[i][n])
            }.bind(this));

            arrRecodes.forEach(function(n) {
                let r = this.rows[i][n];
                
                if (r)
                    this.rows[i][n] = r.split(";").map((k) => {return parseInt(k);});
                else
                    this.rows[i][n] = [];
            }.bind(this))

            let n = 
            this.rows[i][goodForIndex] = this.rows[i][goodForIndex].split(",");

            if (this.rows[i][seatingIndex])
                this.rows[i][seatingIndex] = this.rows[i][seatingIndex].split(",");
            else
                this.rows[i][seatingIndex] = [];
                
            neighborhoods.add(this.getNeighborhood(i));

            let accMap = {"Y": true, "N": false}
            this.rows[i][accessIndex] = accMap[this.rows[i][accessIndex]] || null;
        }

        this.neighborhoods = Array.from(neighborhoods).sort();

        for (let i = this.rows.length-2; i >= 0; i--) {
            this.rows[i].getEthnicity = this.getEthnicity.bind(this, i);
            this.rows[i].getName = this.getName.bind(this, i);
            this.rows[i].getEstablishmentType = this.getEstablishmentType.bind(this, i);
            this.rows[i].getZipCode = this.getZipCode.bind(this, i);
            this.rows[i].getNeighborhood = this.getNeighborhood.bind(this, i);
            this.rows[i].getDescription = this.getDescription.bind(this, i);
            this.rows[i].getGoodFor = this.getGoodFor.bind(this, i);
            this.rows[i].getDietaryRestrictions = this.getDietaryRestrictions.bind(this, i);
            this.rows[i].getSeating = this.getSeating.bind(this, i);
            this.rows[i].getAccessible = this.getAccessible.bind(this, i);
            this.rows[i].getAccessibleSubway = this.getAccessibleSubway.bind(this, i);
        }
    }

    filter(fx) {
        return this.rows.filter(fx);
    }

    getZipCode(i) {
        return this.getAddress(i).match(/[0-9]{5}$/)[0];
    }

    getNeighborhood(i) {
        return this.getAddress(i).match(/\s+([\w\s]+),\s[\w\s]+[0-9]{5}/)[1];
    }
}