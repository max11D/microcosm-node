import React from 'react';
import RCPrice from "./RCPrice";
import RCThumbnail from "./RCThumbnail"
import Restaurant from "../restaurant"
import RCRestaurantDataPillBlock from './RCRestaurantDataPillBlock';

type ResultProps = {
    data: Restaurant,
    onViewDetails: (name: string) => void
}

export default class RCResult extends React.Component<ResultProps, {}> {

    render() {
        let data = this.props.data;
        let est = data.getEstablishmentType()[0];
        let eth = data.getEthnicity();

        if (eth === "Halal Cart")
            est = ""; // Halal carts are halal carts

        return <div className="search-result card">
            {<RCThumbnail data={data}/>}
            <h3 className="search-result-title">{data.getName()} {data.getNonLatinName() ? <span className="non-latin-name"> | {data.getNonLatinName()}</span> : null} </h3>
            <h4 className="search-result-title">{eth} {est}</h4>
            <p className="search-result-description">
                <RCPrice price={data.getPrice()}/> &mdash; <b>{data.getNeighborhood()}</b><br/>{data.getDescription()}
            </p>
            <span style={{ fontSize: "0.80em" }}><RCRestaurantDataPillBlock restaurant={data}/></span>
            <hr />
            <a className="search-result-details" href={"/restaurants/view?name="+data.getName()} onClick={this.onClick.bind(this)}>
                <b>View Details</b>
            </a>
        </div>;
    }

    onClick(e: React.MouseEvent) {
        e.preventDefault();
        this.props.onViewDetails(this.props.data.getName());
    }
}
