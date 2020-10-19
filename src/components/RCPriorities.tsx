import React from 'react';
import {SCREENS, REFINEMENT} from "../enums.js"

type PrioritiesProperties = {
    onClick: (step: number, refinement: number) => void,
};

export default function RCPriorities(props: PrioritiesProperties) {
    let buttonStyle = {width: "14em"}
    return (
        <div style={{
            "textAlign": "center",
            "padding": "0 1em",
            "maxWidth": "24em",
            "margin": "auto"
        }}>
            <p>
                The city is one of the most diverse places in the world, 
                and the food scene reflects that. You don't need to travel 
                far for a new&nbsp;experience.
            </p>
            <button style={buttonStyle} className="orange" 
                onClick={() => {props.onClick(SCREENS.REFINE, REFINEMENT.CUISINE)}}>
                    filter by cuisine
            </button>
            <p>That said, we all have lazy days.</p>
            <button style={buttonStyle} className="orange"
                onClick={() => {props.onClick(SCREENS.REFINE, REFINEMENT.NEIGHBORHOOD)}}>
                    filter by neighborhood
            </button>
            <p>
                We love sharing culinary experiences &mdash; that's why this 
                guide exists &mdash; and that means accommodating everyone's 
                dietary restrictions and accessibility demands.
            </p>
            <button style={buttonStyle} className="cyan"
                onClick={() => {props.onClick(SCREENS.REFINE, REFINEMENT.DIET)}}>
                    filter by diet
            </button>
            <br/><br/>
            <button style={buttonStyle} className="cyan"
                onClick={() => {props.onClick(SCREENS.REFINE, REFINEMENT.ACCESSIBILITY)}}>
                find accessible options
            </button>
        </div>
    )
}