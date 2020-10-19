import React from 'react';
import RCPrice from "./RCPrice";
import RCThumbnail from "./RCThumbnail"
import Restaurant from "../restaurant"

type ResultProps = {
    data: Restaurant,
    onViewDetails: (name: string) => void
}

export default class RCResult extends React.Component<ResultProps, {}> {
    prepSeatingPills() {
        let seating = this.props.data.getSeating();
        seating.splice(seating.indexOf("None"));
        seating = seating.map((x) => {
            let rv = x;
            if (rv.includes("Public"))
                return "Nearby " + rv;
            else if (rv.match(/(Sidewalk|Indoor|Private)/))
                return rv + " Seating";
            return rv;
        });
        return seating;
    }

    render() {
        let data = this.props.data;
        let est = data.getEstablishmentType()[0];
        let eth = data.getEthnicity();

        if (eth === "Halal Cart")
            est = ""; // Halal carts are halal carts

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

        return <div className="search-result card">
            {<RCThumbnail data={data}/>}
            <h3 className="search-result-title">{data.getName()} - {eth} {est}</h3>
            <p className="search-result-description">
                <RCPrice price={data.getPrice()}/> &mdash; <b>{data.getNeighborhood()}</b><br/>{data.getDescription()}
            </p>
            <span style={{ fontSize: "0.80em" }}>{pills}</span>
            <hr />
            <div className="search-result-details" onClick={this.onClick.bind(this)}><b>View Details</b></div>
        </div>;
    }

    onClick(e: React.MouseEvent) {
        this.props.onViewDetails(this.props.data.getName());
    }
}
