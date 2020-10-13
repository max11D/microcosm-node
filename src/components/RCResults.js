/* eslint-disable no-extra-bind */

import React from 'react';
import {REFINEMENT} from "../enums.js"
import "styles/refinementScreens.scss"
import FIELD_RECODES from "fieldRecodes.js"
import { Result } from './Result';

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