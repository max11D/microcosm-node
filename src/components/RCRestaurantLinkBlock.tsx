import React from 'react';
import Restaurant from "../restaurant"

type BlockProps = {
    restaurant: Restaurant
}

export default class RCRestaurantLinkBlock extends React.Component<BlockProps, {}> {
    renderButton(icon: string, alt: string, href: string, label: string) {
        return <a className="restaurant-link-button" href={href} key={label} target="_blank" rel="noopener noreferrer">
            <img className="restaurant-link-icon" src={icon} alt={alt}/><br/>
            {label}
        </a>
    }

    render() {
        let data = this.props.restaurant;
        let buttons: JSX.Element[] = [];

        let w = data.getPhone();
        if (w)
            buttons.push(this.renderButton("/icons/phone.png", "phone icon", "tel:+1" + w.replace(/[^0-9]/g, ""), "Telephone"));

        w = data.getWebsite();
        if (w) 
            buttons.push(this.renderButton("/icons/website.png", "website icon", w, "Website"))

            w = data.getInstagramURL();
            if (w)
                buttons.push(this.renderButton("/icons/instagram.png", "instagram icon", w, "Instagram"))

            w = data.getFacebookURL();
            if (w)
                buttons.push(this.renderButton("/icons/facebook.png", "facebook icon", w, "Facebook"))
        

        return <div className="restaurant-link-block">
            {buttons}
        </div>
    }
}
