import React from 'react';
import Restaurant from '../restaurant';
import RCAccIcon from './RCAccIcon'

type ThumbnailProps = {
    data: Restaurant
}

export default class RCRefinementFooter extends React.Component<ThumbnailProps, {}> {
    render() {
        let img = null, data = this.props.data;

        let ratingInner = [];

        for (var i = data.getRating(); i > 0; i--) {
            ratingInner.push(<div className="rating-star" key={i}></div>)
        }

        let rating = <div className="rating-container">
            {ratingInner}
        </div>

        if (data.hasImage()) {
            let path = "/images/restaurants/" + data.getURLSlug() + "/thumb.jpg";
            img = <img className="search-result-image" src={path} alt={data.getFirstImageAlt()}/>
        } else {
            img = <div className="search-result-image"/>
        }
        return <div className="search-result-image-container">
            {data.getAccessible() ? <RCAccIcon gold={!!data.getAccessibleSubway()}/> : null}    
            {img}
            {rating}
        </div>
    }
}