import React, {Component} from "react";
import Restaurant from "../restaurant";
import jQuery from "../utils/jquery";
import RCCarousel from "./RCCarousel"
import RCPrice from "./RCPrice";
import RCRestaurantDataPillBlock from './RCRestaurantDataPillBlock';
import RCRestaurantLinkBlock from './RCRestaurantLinkBlock';
import RCAccessibilityInfoBlock from "./RCAccessibilityInfoBlock"
import RCSupportSmallBusinesses from "./RCSupportSmallBusinesses"

// Dirty hack
type jQuery = any;

// Type declarations for props and states
type RestaurantViewProps = {
    data: Restaurant | null,
    onClose: () => void | undefined | null,
    modal?: boolean
};

type RestaurantViewState = { additionalAltText: string[] };

type SubComponentProps = { restaurant: Restaurant | null }
// End type declarations for props and states

/**
 * Sub-component that renders payment methods accepted by the establishment
 */
const RCPaymentMethods = (props: SubComponentProps) => {
    if (props.restaurant) {
        let data = props.restaurant;
        let payMethodElements: JSX.Element[] = [], payMethods = data.getPaymentMethods();

        if (payMethods.length > 0) {
            if (payMethods.length === 1)
                payMethods[0] += " Only";

            payMethodElements.push(<h3 key="h" style={{margin: "0"}}>Accepted Payment Methods</h3>);
            payMethodElements.push(<div>{payMethods.map((x: string, i: number) => {
                let s = (i === 0 ? {marginLeft: "0"} : {});
                return <div className="pill gray-pill" key={i} style={s}>{x}</div>;
            })}</div>);
        }

        return <div>{payMethodElements}</div>;
    } else {
        return null;
    }
}

/**
 * Sub-component that renders payment methods accepted by the establishment
 */
const RCRecommendations = (props: SubComponentProps) => {
    if (props.restaurant) {
        let data = props.restaurant;
        let recElements: JSX.Element[] = [], recs = data.getRecommendations();

        if (recs.length > 0) {
            recElements.push(<h3 key="h" style={{margin: "0"}}>Recommendations</h3>)
            recElements.push(<ul key="l" style={{marginTop: "0.1em"}}>
                {recs.map((x: string, i: number) => {
                    return <li>{x}</li>
                })}
            </ul>);
        }

        return <div>{recElements}</div>

    } else {
        return null;
    }
}

/**
 * View user interface for a restaurant
 */
export default class RCRestaurantView extends Component<RestaurantViewProps, RestaurantViewState> {
    constructor(props: RestaurantViewProps) {
        super(props);
        this.state = {additionalAltText: []}
    }

    componentDidUpdate(prevProps: RestaurantViewProps, prevState: RestaurantViewState) {
        if (this.props.data?.getName() !== prevProps.data?.getName() && (this.props.data?.getImageCount() || 0) > 1) {
            // fetch the alt text file if the component has been passed a new restaurant and 
            // it has more than one image.
            jQuery.get(this.props.data?.getAdditionalAltURL()).success(function(this: RCRestaurantView, data: string) {
                this.setState({
                    additionalAltText: data.split("\n")
                });
            }.bind(this));
        }
    }

    /**
     * Getter method that returns all alt text strings
     */
    allAltText(): string[] {
        if (this.props.data)
            return [this.props.data.getFirstImageAlt()].concat(this.state.additionalAltText);
        else 
            return [];
    }

    render() {
        if (this.props.data) {
            var data = this.props.data;
            let name = data.getName();

            let inner = <div>
                <h2 className="restaurant-view-header">
                    {!!this.props.onClose && this.props.modal ? <span onClick={this.props.onClose} className="modal-close">&times;</span> : null }
                    {name} {data.getNonLatinName() ? <span className="non-latin-name"> | {data.getNonLatinName()}</span> : null}
                </h2>
                <h3 className="restaurant-view-header">
                {data.getEthnicity()} {data.getEstablishmentType().join(" & ")}
                </h3>
                <RCCarousel urls={data.getAllImageURLs()} alts={this.allAltText()}/>
                <p className="restaurant-view-address">
                    <a rel="noopener noreferrer" href={"https://maps.google.com/maps?q="+name + ' ' + data.getAddress()} target="_blank">
                        {data.getAddress()}
                    </a>
                    </p>
                <p className="restaurant-view-description">
                    <RCPrice price={data.getPrice()}/> &mdash; {data.getDescription()}
                </p>
                <RCRecommendations restaurant={data}/>
                <span style={{ fontSize: "0.80em" }}>
                    <RCRestaurantDataPillBlock restaurant={data}/>
                    <hr/>
                    <RCAccessibilityInfoBlock restaurant={data}/>
                </span>
                <hr/>
                <RCRestaurantLinkBlock restaurant={data}/>
                <hr/>
                <RCPaymentMethods restaurant={data}/>
                <RCSupportSmallBusinesses/>
            </div>

            if (this.props.modal) {
                return <div className="modal-hider visible">
                    <div className="modal-container">
                        {inner}
                        {!!this.props.onClose ? <button onClick={this.props.onClose} className="modal-close-footer">Hide Details</button> : null }
                    </div>
                </div>
            } else {
                return <div style={{padding: "0.5em"}}>
                    {inner}
                    <br/>
                    <a href="/restaurants/search" className="button orange full-width text-align-center">Back to Search</a>
                </div>
            }
            
        } else {
            return null;
        }
    }
};