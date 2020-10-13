import React from 'react';
import {REFINEMENT} from "../enums.js"
import "styles/refinementScreens.scss"
import FIELD_RECODES from "fieldRecodes.js"

class RCCuisineRefinementScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tagMatcher: ""};
    }

    onTextUpdate(e) {
        this.setState({tagMatcher: e.target.value})
    }

    render() {
        let cuisines = this.props.refinements.cuisines;

        return <div className="refinementContainer">
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
                    let m = this.state.tagMatcher.trim().toLowerCase();
                    if (m !== "" && !c.toLowerCase().includes(m) && !cuisines[c])
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
}

class RCNeighborhoodRefinementScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tagMatcher: ""}
    }

    onTextUpdate(e) {
        this.setState({tagMatcher: e.target.value})
    }

    render() {
        let hoods = this.props.refinements.neighborhoods;

        return <div className="refinementContainer">
            <div className="refinementHeader">
                <h1 className="refineView">Refine results by cuisine</h1>
                <div style={{margin: "0 12px"}}>
                    <input type="text" placeholder="Today's location..." className="full-width" 
                        value={this.state.tagMatcher} onChange={this.onTextUpdate.bind(this)}/>
                </div>
            </div>
            <hr/>
            <div style={{fontSize: "0.9em"}}>
                {this.props.neighborhoods.map(function(c, i) {
                    let m = this.state.tagMatcher.trim().toLowerCase();
                    if (m !== "" && !c.toLowerCase().includes(m) && !hoods[c])
                        return null;
                    let cc = c.replace(" ", ""); //CamelCase
                    return <span key={"neighborhoods_"+i}>
                        <input type="checkbox" id={"neighborhoods_"+cc} name={"neighborhoods."+c} value={c}
                            className="hidden" checked={hoods[c] ? true : false} onChange={this.props.onTick}/>
                        <label htmlFor={"neighborhoods_"+cc} className="pill"><b>{c}</b></label>
                    </span>
                }.bind(this))} 
            </div>
        </div>
    }
}

class RefinementFooter extends React.Component {
    render() {
        return <div className="refinement-footer">
            <a href="#" onClick={this.props.clearRefinement} className="clear-filter">
                clear filter
            </a>
            <button onClick={this.props.viewResults} className="cyan">
                view {this.props.resultCount} results
            </button>
        </div>
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

        if (this.props.currentRefinement === REFINEMENT.CUISINE) {
            retval = <RCCuisineRefinementScreen key="r" 
                refinements={this.props.refinements} 
                onTick={this.props.onTick}/>
        } else if (this.props.currentRefinement === REFINEMENT.NEIGHBORHOOD) {
            retval = <RCNeighborhoodRefinementScreen key="r"
                refinements={this.props.refinements}
                onTick={this.props.onTick}
                neighborhoods={this.props.neighborhoods}/>
        }
        return [retval, <RefinementFooter key="f"
            viewResults={this.props.viewResults}/>];
    }
}

export default RCRefinementScreens;