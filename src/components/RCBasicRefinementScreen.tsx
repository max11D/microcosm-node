/* eslint-disable no-throw-literal */

import React from 'react';

export type BasicRefinementScreenProps = {
    onTick: (e: React.ChangeEvent<HTMLInputElement>) => void,
    selected: string[],
    neighborhoods?: string[]
}

export type BasicRefinementScreenState = {
    tagMatcher: string
}

export default abstract class RCBasicRefinementScreen extends React.Component<BasicRefinementScreenProps, BasicRefinementScreenState> {
    abstract placeholder: string;
    abstract refinementName: string;
    abstract header: string;
    explanation: JSX.Element | null = null;

    constructor(props: BasicRefinementScreenProps) {
        super(props);
        this.state = {tagMatcher: ""};
    }

    onTextUpdate(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({tagMatcher: e.target.value})
    }

    abstract getOptions(): string[];

    render() {
        if (!this.refinementName)
            throw "RCBasicRefinementScreen: refinementName is undefined!";
        if (!this.getOptions())
            throw 'RCBasicRefinementScreen: getOptions() is undefined!';

        let selected = this.props.selected;

        let matcher = null;

        if (this.placeholder) 
            matcher = <div style={{margin: "0 12px"}}>
                <input type="text" placeholder={this.placeholder} className="full-width" 
                    value={this.state.tagMatcher} onChange={this.onTextUpdate.bind(this)}/>
            </div>;

        return <div className="refinementContainer">
            <div className="refinementHeader">
                <h1 className="refineView">{this.header}</h1>
                {matcher}
            </div>
            <hr/>
            <div style={{fontSize: "0.9em"}}>
                {this.getOptions().map(function(this: RCBasicRefinementScreen, c: string, i: number) {
                    let m = this.state.tagMatcher.trim().toLowerCase();
                    if (m !== "" && !c.toLowerCase().includes(m) && selected.indexOf(c) < 0)
                        return null;

                    let cc = c.replace(" ", ""); //CamelCase
                    return <span key={this.refinementName+"_"+i}>
                        <input type="checkbox" id={this.refinementName+"_"+cc} 
                            name={this.refinementName} value={c}
                            className="hidden" checked={selected.indexOf(c) >= 0 ? true : false} onChange={this.props.onTick}/>
                        <label htmlFor={this.refinementName+"_"+cc} className="pill"><b>{c}</b></label>
                    </span>
                }.bind(this))} 
            </div>
            <br/>
            {this.explanation}
        </div>
    }
}