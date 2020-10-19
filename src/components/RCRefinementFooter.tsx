import React from 'react';

type RefinementFooterProps = {
    onClear: () => void,
    viewResults: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    resultCount?: number
}

export default class RCRefinementFooter extends React.Component<RefinementFooterProps, {}> {
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
