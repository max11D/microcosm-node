import React, {Component} from "react";
import Hammer from "hammerjs"

type CarouselProps = {
    urls: string[],
    alts: string[],
    className?: string | undefined
};

type CarouselState = {
    currentImage: number,
    instanceUID: string;
};

export default class RCCarousel extends Component<CarouselProps, CarouselState> {
    constructor(props: CarouselProps) {
        super(props);
        let uid = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        this.state = {currentImage: 0, instanceUID: uid};
    }

    componentDidMount() {
        let outer = document.getElementById(this.state.instanceUID);
        if (outer) {
            let hammertime = new Hammer(outer);

            hammertime.on("swipeleft", function(this: RCCarousel) {
                let i = this.state.currentImage + 1;
                if (i >= this.props.urls.length)
                    i = this.props.urls.length - 1;
                this.setState({currentImage: i});
            }.bind(this))
            
            hammertime.on("swiperight", function(this: RCCarousel) {
                let i = this.state.currentImage - 1;
                if (i < 0)
                    i = 0;
                this.setState({currentImage: i});
            }.bind(this))
        }
        

    }

    render() {
        var urls: string[], alts: string[];

        if (this.props.urls.length > 0) {
            urls = this.props.urls;
            alts = this.props.alts;
        } else {
            urls = ["/images/blank.jpg"];
            alts = ["No image"];
        }

        let innerWidthPct = urls.length * 100 + "%";
        let imgWidthPct = 100.0 / urls.length + "%";

        let translation = "translate(-" + (100.0 * this.state.currentImage / urls.length) + "%, 0)"

        return <div id={this.state.instanceUID} className={(this.props.className || "") + " carousel-outer"}>
            <div className="carousel-inner" style={{width: innerWidthPct, transform: translation}}>
                {urls.map(function(this: RCCarousel, url: string, index: number) {
                    return <div className="carousel-image-frame" style={{width: imgWidthPct, paddingBottom: imgWidthPct}}>
                        <img src={url} alt={alts[index]} 
                            className="carousel-image"/>
                        </div>
                    
                }.bind(this))}
            </div>
        </div>
    }
}