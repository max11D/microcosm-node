import React from 'react';
import Restaurant from "../restaurant"

type BlockProps = {
    restaurant: Restaurant
}

export default class RCRestaurantDataPillBlock extends React.Component<BlockProps, {}> {
    prepSeatingPills() {
        let seating = this.props.restaurant.getSeating();

        let idxNone = seating.indexOf("None");
        
        if (idxNone >= 0)
            seating.splice(idxNone);

        return seating.map((x) => {
            let rv = x;
            if (rv.includes("Public"))
                return "Nearby " + rv;
            else if (rv.match(/(Sidewalk|Indoor|Private)/i))
                return rv + " Seating";
            return rv;
        });
    }

    render() {
        let data = this.props.restaurant;

        var pills: JSX.Element[] = [];

        let fx = function (pillColor: string, x: string, i: number) {
            pills.push(<span key={x}
                className={pillColor + " pill search-result-pill "}>
                {x.toLowerCase()}
            </span>);
        };

        data.getGoodFor().map(fx.bind(this, "orange-pill"));
        data.getDietaryRestrictions().map(fx.bind(this, "cyan-pill"));
        this.prepSeatingPills().map(fx.bind(this, "cyan-pill"));

        return pills;
    }
}