import React from 'react';

export default class RCBasicRefinementScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tagMatcher: ""};
    }

    onTextUpdate(e) {
        this.setState({tagMatcher: e.target.value})
    }

    render() {
        if (!this.refinementName)
            throw "RCBasicRefinementScreen: refinementName is undefined!";
        if (!this.getOptions())
            throw 'RCBasicRefinementScreen: getOptions() is undefined!';

        let selected = this.props.refinements[this.refinementName];

        return <div className="refinementContainer">
            <div className="refinementHeader">
                <h1 className="refineView">{this.header}</h1>
                <div style={{margin: "0 12px"}}>
                    <input type="text" placeholder={this.placeholder} className="full-width" 
                        value={this.state.tagMatcher} onChange={this.onTextUpdate.bind(this)}/>
                </div>
            </div>
            <hr/>
            <div style={{fontSize: "0.9em"}}>
                {this.getOptions().map(function(c, i) {
                    let m = this.state.tagMatcher.trim().toLowerCase();
                    if (m !== "" && !c.toLowerCase().includes(m) && !selected[c])
                        return null;
                    let cc = c.replace(" ", ""); //CamelCase
                    return <span key={this.refinementName+"_"+i}>
                        <input type="checkbox" id={this.refinementName+"_"+cc} 
                            name={this.refinementName+"."+c} value={c}
                            className="hidden" checked={selected[c] ? true : false} onChange={this.props.onTick}/>
                        <label htmlFor={this.refinementName+"_"+cc} className="pill"><b>{c}</b></label>
                    </span>
                }.bind(this))} 
            </div>
        </div>
    }
}