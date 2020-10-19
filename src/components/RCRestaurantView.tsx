import React, {Component} from "react";
import Restaurant from "../restaurant";
import jQuery from "../utils/jquery";
import RCCarousel from "./RCCarousel"
import RCPrice from "./RCPrice";

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
                </div>
            </div>
        } else {
            return null;
        }
    }
};