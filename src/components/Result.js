import React from 'react';

export class Result extends React.Component {
    render() {
        let data = this.props.data;
        let est = data.getEstablishmentType()[0];
        let eth = data.getEthnicity();
        if (eth === "Halal Cart")
            est = null; // Halal carts are halal carts

        var pills = [];

        var kn = 0;

        let fx = function (pillColor, x, i) {
            pills.push(<span key={pillColor[0] + kn}
                className={pillColor + " pill search-result-pill " + pillColor[0] + i}>
                {x.toLowerCase()}
            </span>);
            kn++;
        };

        data.getGoodFor().map(fx.bind(this, "orange-pill"));
        data.getDietaryRestrictions().map(fx.bind(this, "cyan-pill"));

        let seating = data.getSeating();
        seating.splice(seating.indexOf("None"));
        seating = seating.map((x) => {
            let rv = x;
            if (rv.includes("Public"))
                return "Nearby " + rv;
            else if (rv.match(/(Sidewalk|Indoor|Private)/))
                return rv + " Seating";
            return rv;
        });

        seating.map(fx.bind(this, "cyan-pill"));

        return <div className="search-result card">
            <h3 className="search-result-title">{data.getName()} - {eth} {est}</h3>
            <p className="search-result-description">
                <b>{data.getNeighborhood()}</b> - {data.getDescription()}
            </p>
            <span style={{ fontSize: "0.80em" }}>{pills}</span>
            <hr />
            <div className="search-result-details"><b>View Details</b></div>
        </div>;
    }
}
