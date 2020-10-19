import React from 'react';

type AccIconProps = {
    gold: boolean
}

export default class RCAccIcon extends React.Component<AccIconProps, {}> {
    render() {
        let c = "access-icon", alt="Wheelchair Icon";
        if (this.props.gold) {
            c += " gold";
            alt = "Gold " + alt;
        }
        
        return (
            <img src="/images/icons/accessible-01.png" className={c} alt={alt}/>
        );
    }
}