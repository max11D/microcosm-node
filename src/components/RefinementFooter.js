import React from 'react';

export default class RefinementFooter extends React.Component {
    render() {
        return <div className="refinement-footer">
            <a href="#" onClick={this.props.onClear} className="clear-filter">
                clear filter
            </a>
            <button onClick={this.props.viewResults} className="cyan">
                view {this.props.resultCount} results
            </button>
        </div>;
    }
}
