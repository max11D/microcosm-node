import React, {Component} from "react";
import Restaurant from "../restaurant";
import jQuery from "../utils/jquery";
import RCCarousel from "./RCCarousel"
import RCPrice from "./RCPrice";
import RCRestaurantDataPillBlock from './RCRestaurantDataPillBlock';
import RCRestaurantLinkBlock from './RCRestaurantLinkBlock';
import RCAccessibilityInfoBlock from "./RCAccessibilityInfoBlock"

type jQuery = any;

type RestaurantViewProps = {
    data: Restaurant | null,
    onClose: () => void | undefined | null
};

type RestaurantViewState = {
    additionalAltText: string[]
};

export default class RCRestaurantView extends Component<RestaurantViewProps, RestaurantViewState> {
    constructor(props: RestaurantViewProps) {
        super(props);
        this.state = {additionalAltText: []}
    }

    componentDidMount() {
        
    }

    componentDidUpdate(prevProps: RestaurantViewProps, prevState: RestaurantViewState) {
        if (this.props.data?.getName() !== prevProps.data?.getName()) {
            jQuery.get(this.props.data?.getAdditionalAltURL()).success(function(this: RCRestaurantView, data: string) {
                this.setState({
                    additionalAltText: data.split("\n")
                });
            }.bind(this));
        }
    }

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
            let recElements: JSX.Element[] = [], recs = data.getRecommendations();
            let payMethodElements: JSX.Element[] = [], payMethods = data.getPaymentMethods();

            if (recs.length > 0) {
                recElements.push(<h3 key="h" style={{margin: "0"}}>Recommendations</h3>)
                recElements.push(<ul key="l" style={{marginTop: "0.1em"}}>
                    {recs.map((x: string, i: number) => {
                        return <li>{x}</li>
                    })}
                </ul>);
            }

            if (payMethods.length > 0) {
                if (payMethods.length == 1)
                    payMethods[0] += " Only";

                payMethodElements.push(<h3 key="h" style={{margin: "0"}}>Accepted Payment Methods</h3>);
                payMethodElements.push(<div>{payMethods.map((x: string, i: number) => {
                    let s = (i == 0 ? {marginLeft: "0"} : {});
                    return <div className="pill gray-pill" key={i} style={s}>{x}</div>;
                })}</div>)
            }

            return <div className="modal-hider visible">
                <div className="modal-container">
                    <h2 className="restaurant-view-header">
                        {!!this.props.onClose ? <span onClick={this.props.onClose} className="modal-close">&times;</span> : null }
                        {name} - {data.getEthnicity()} {data.getEstablishmentType().join(" & ")}
                    </h2>
                    <RCCarousel urls={data.getAllImageURLs()} alts={this.allAltText()}/>
                    <p className="restaurant-view-address">
                        <a rel="noopener noreferrer" href={"https://maps.google.com/maps?q="+name + ' ' + data.getAddress()} target="_blank">
                            {data.getAddress()}
                        </a>
                        </p>
                    <p className="restaurant-view-description">
                        <RCPrice price={data.getPrice()}/> &mdash; {data.getDescription()}
                    </p>
                    {recElements}
                    <span style={{ fontSize: "0.80em" }}>
                        <RCRestaurantDataPillBlock restaurant={data}/>
                        <hr/>
                        <RCAccessibilityInfoBlock restaurant={data}/>
                    </span>
                    <hr/>
                    <RCRestaurantLinkBlock restaurant={data}/>
                    <hr/>
                    {payMethodElements}
                </div>
            </div>
        } else {
            return null;
        }
    }
};