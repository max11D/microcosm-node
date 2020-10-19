import React from "react";

interface RCPriceProps {
    price: number
}

const RCPrice: React.FunctionComponent<RCPriceProps> = (props) => {
    let str1 = "";
    let str2 = "";

    for (var i = 0; i < 5; i++){
        if (i < props.price)
            str1 += "$";
        else
            str2 += "$";
    }

    return <span className="price-outer">
        {str1}
        {str2.length > 0 ? <span className="price-inner">{str2}</span> : null}
    </span>
}

export default RCPrice;