/* eslint-disable no-extra-bind */
import React, {Component} from "react";
import Hammer from "hammerjs"

type CarouselProps = {
    urls: string[],
    alts: string[],
    className?: string
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

    onThumbnailClick(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
        let n = parseInt(e.currentTarget.getAttribute("data-value") || "");
        
        if (n >= 0)
            this.setState({currentImage: n});
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

        let thumbnails: JSX.Element | null = null;

        if (urls.length > 1) {
            thumbnails = <div className="carousel-thumbnail-container">
                {urls.map(function(this: RCCarousel, url: string, index: number) {
                    let isActive = (index === this.state.currentImage ? "active" : "");
                    
                    return <img 
                        src={url} 
                        key={index} 
                        alt={"Thumbnail "+(index+1)} 
                        data-value={index}
                        className={"carousel-thumbnail "+isActive} 
                        onClick={this.onThumbnailClick.bind(this)}/>
                }.bind(this))}
            </div>
        }

        return <div className={(this.props.className || "") + " carousel-outer"}>
            <div id={this.state.instanceUID} 
                className="carousel-inner" 
                style={{width: innerWidthPct, transform: translation}}>

                {urls.map(function(this: RCCarousel, url: string, index: number) {
                    let imageCredit = "";
                    if (alts[index] && alts[index].match(/Image\sCredit:\s/))
                        imageCredit = alts[index].split("Image Credit: ")[1];
                    return <div className="carousel-image-frame" key={index}
                        style={{width: imgWidthPct, paddingBottom: imgWidthPct}}>
                            
                        <img src={url} alt={alts[index]} 
                            className="carousel-image"/>
                        {imageCredit ? <span className="carousel-image-credit">{imageCredit}</span> : null}
                        </div>
                    
                }.bind(this))}
            </div>

            {thumbnails}
        </div>
    }
}