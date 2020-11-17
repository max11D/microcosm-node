import React from 'react';

type BurgerMenuProps = {
    open: boolean
}

export default class RCBurgerMenu extends React.Component<BurgerMenuProps, {}> {
    render() {
        return <div className={"burger-menu " + (this.props.open ? "open" : "")}>
            <a className="burger-menu" href="/">Home</a>
            <a className="burger-menu" href="/restaurants/search">Browse Restaurants</a>
            <a className="burger-menu indent" href="/restaurants/search?accessibility=fully">Fully Accessible</a>
            <a className="burger-menu indent" href="/restaurants/search?dietaryRestrictions=Vegetarian">Vegetarian</a>
            <a className="burger-menu indent" href="/restaurants/search?dietaryRestrictions=Vegan">Vegan</a>
            <a className="burger-menu indent" href="/restaurants/search?dietaryRestrictions=Halal">Halal</a>
            <a className="burger-menu indent" href="/restaurants/search?dietaryRestrictions=Kosher">Kosher</a>
            <a className="burger-menu" href="/about.html">About the Project</a>
            <a className="burger-menu" href="/about.html#grades">About the Grades</a>
            <a className="burger-menu" href="/contact">Contact</a>
            <a className="burger-menu" href="https://www.instagram.com/microcosm.nyc">Instagram</a>
        </div>;
    }
}