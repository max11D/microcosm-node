/* eslint-disable no-extra-bind */

import React from 'react';
import {REFINEMENT} from "../enums.js"
import "styles/refinementScreens.scss"
import FIELD_RECODES from "fieldRecodes.js"

class Result extends React.Component {
    render() {
        let data = this.props.data;
        let est = data.getEstablishmentType()[0];
        let eth = data.getEthnicity();
        if (eth === "Halal Cart") est = null; // Halal carts are halal carts

        var pills = [];

        var kn = 0;

        let fx = function(pillColor, x, i) {
            pills.push(<span key={pillColor[0]+kn} 
                className={pillColor + " pill search-result-pill "+pillColor[0]+i}>
                    {x.toLowerCase()}
                </span>);
            kn++;
        }

        data.getGoodFor().map(fx.bind(this, "orange-pill"));
        data.getDietaryRestrictions().map(fx.bind(this, "cyan-pill"));

        let seating = data.getSeating();
        seating.splice(seating.indexOf("None"));
        seating = seating.map((x) => {
            let rv = x;
            if (rv.includes("Public"))
                return "Nearby " + rv;
            else if (rv.match(/(Sidewalk|Indoor|Private)/))
                return rv + " Seating";
            return rv;
        })

        seating.map(fx.bind(this, "cyan-pill"));

        return <div className="search-result card">
            <h3 className="search-result-title">{data.getName()} - {eth} {est}</h3>
            <p className="search-result-description">
                <b>{data.getNeighborhood()}</b> - {data.getDescription()}
            </p>
            <span style={{fontSize: "0.80em"}}>{pills}</span>
            <hr/>
            <div className="search-result-details"><b>View Details</b></div>
        </div>
    }
}

class Results extends React.Component {
    render() {
        var refinements = this.props.refinements;
        var cuisines = [], neighborhoods = [];
        let restaurants = this.props.restaurants || [];

        FIELD_RECODES.cuisines.forEach((c) => {
            if (refinements.cuisines[c] === true)
                cuisines.push(c);
        });

        restaurants.neighborhoods.forEach((c) => {
            if (refinements.neighborhoods[c] === true)
                neighborhoods.push(c);
        })

        let results = restaurants.filter(function(row) {
            let retval = true;
            if (cuisines.length > 0) {
                retval = retval && cuisines.includes(row.getEthnicity());
            }
            if (neighborhoods.length > 0) {
                retval = retval && neighborhoods.includes(row.getNeighborhood());
            }

            return retval;
        }.bind(this));

        let retval = results.map(function(r,i){
            return <Result key={"result_"+i} data={r}/>;
        }.bind(this));

        var vR = this.props.viewRefinement;

        retval.unshift(<div style={{textAlign: "center"}}>
            <div style={{fontSize: "0.9em", marginTop: "0.66em"}}>filter results by</div>
            <button className="orange view-refinement-button" name={REFINEMENT.CUISINE} onClick={vR}>cuisine</button>
            <button className="orange view-refinement-button" name={REFINEMENT.NEIGHBORHOOD} onClick={vR}>neighborhood</button>
            <br/>
            <button className="cyan view-refinement-button" name={REFINEMENT.ACCESSIBILITY} onClick={vR}>accessibility</button>
            <button className="cyan view-refinement-button" name={REFINEMENT.DIET} onClick={vR}>diet</button>
            <hr/>
        </div>)

        return retval;
    }
}

export default Results;