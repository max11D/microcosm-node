import React from 'react';
import {SCREENS, REFINEMENT} from "../enums.js"
import "styles/refinementScreens.scss"
import FIELD_RECODES from "fieldRecodes.js"

class RCCuisineRefinementScreen extends React.Component {
    constructor(props) {
        super(props);
    }
}

class RCRefinementScreens extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagMatcher: ""
        }
    }

    onTextUpdate(e) {
        this.setState({tagMatcher: e.target.value})
    }

    render() {
        let retval = null;

        let cuisines = this.props.refinements.cuisines;

        if (this.props.currentRefinement == REFINEMENT.CUISINE) {
            retval = <div className="refinementContainer">
                <div className="refinementHeader">
                    <h1 className="refineView">Refine results by cuisine</h1>
                    <div style={{margin: "0 12px"}}>
                        <input type="text" placeholder="Today's craving..." className="full-width" 
                            value={this.state.tagMatcher} onChange={this.onTextUpdate.bind(this)}/>
                    </div>
                </div>
                <hr/>
                <div style={{fontSize: "0.9em"}}>
                    {FIELD_RECODES.cuisines.map(function(c, i) {
                        let m = this.state.tagMatcher.trim();
                        if (m != "" && !c.includes(m))
                            return null;
                        let cc = c.replace(" ", ""); //CamelCase
                        return <span key={"cuisine_"+i}>
                            <input type="checkbox" id={"cuisine_"+cc} name={"cuisines."+c} value={c}
                                className="hidden" checked={cuisines[c] ? true : false} onChange={this.props.onTick}/>
                            <label htmlFor={"cuisine_"+cc} className="pill"><b>{c}</b></label>
                        </span>
                    }.bind(this))} 
                </div>
            </div>
        }
// .filter((x) => {return !(x == null);})
        return retval;
    }
}

export default RCRefinementScreens;