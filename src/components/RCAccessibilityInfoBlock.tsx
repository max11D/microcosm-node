import React from 'react';
import Restaurant from "../restaurant";
import RCSubwayBullet from './RCSubwayBullet';
import preventStringOrphans from "../utils/preventStringOrphans"

type BlockProps = {
    restaurant: Restaurant
}

export default class RCAccessibilityInfoBlock extends React.Component<BlockProps, {}> {
    render() {
        let data = this.props.restaurant;

        let delivery: JSX.Element | null = null, 
            facilities: JSX.Element | null = null,
            subway: JSX.Element | null = null;

        if (data.getDelivery()) {
            delivery = <div className="restaurant-access-info-element scooter">
                delivery<br/>available
            </div>
        }

        if (data.getAccessible()) {
            facilities = <div className="restaurant-access-info-element wheelchair">
                fully accessible<br/>facilities
            </div>
        }

        let s = data.getAccessibleSubway();
        if (s) {
            let bullets = "";
            if (s.match(/74th/i) && s.match(/broadway/i))
                bullets = "EFMR7";
            else if (s.match(/kew\sgardens/i))
                bullets = "EF";
            else if (s.match(/(flushing|woodside|junction)/i))
                bullets = "7";
            
            subway = <div className="restaurant-access-info-element subway">
                near accessible station<br/>
                <b>{preventStringOrphans(s)}</b><br/>
                <RCSubwayBullet train={bullets} style={{marginTop: "0.2em"}}/>
            </div>
        }

        return <div className="restaurant-access-info">
            {delivery} {subway} {facilities} 
        </div>;
    }
}