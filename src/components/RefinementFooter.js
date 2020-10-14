import React from 'react';

export default class RefinementFooter extends React.Component {
    render() {
        return <div className="refinement-footer">
            <button onClick={this.props.onClear} className="clear-filter anchor-style">
                clear filter
            </button>
            <button onClick={this.props.viewResults} className="cyan">
                view {this.props.resultCount} results
            </button>
        </div>;
    }
}
