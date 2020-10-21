import React from 'react';

type BulletProps = {
    train: string,
    style?: React.CSSProperties
}

export default class RCSubwayBullet extends React.Component<BulletProps, {}> {
    render() {
        if (this.props.train.length > 1) {
            var rs = this.props.style;
            return this.props.train.split("").map((x,i) => {return <RCSubwayBullet train={x} key={i} style={rs}/>;});
        }

        let colors = {
            blue: "0039a6",
            orange: "ff6319",
            lime: "6cbe45",
            brown: "996633",
            gray: "a7a9ac",
            yellow: "fccc0a",
            red: "ee352e",
            green: "00933c",
            purple: "b933ad",
            darkGray: "808183",
            turquoise: "00add0" //LOLOLOLOLOLOL
                // For those out of the loop, the T line 
                // is the planned 2nd ave subway. God help you if
                // you're still using this when the T is complete.
        };

        
        let textColor = "white", bulletColor = "";
        let t = this.props.train;

        if (t.match(/[ACE]/))
            bulletColor = colors.blue;
        else if (t.match(/[BDFM]/))
            bulletColor = colors.orange;
        else if (t.match(/G/))
            bulletColor = colors.lime;
        else if (t.match(/[JZ]/))
            bulletColor = colors.brown;
        else if (t.match(/[L]/))
            bulletColor = colors.gray;
        else if (t.match(/[S]/))
            bulletColor = colors.darkGray;
        else if (t.match(/[NQRW]/)) {
            bulletColor = colors.yellow;
            textColor = "black";
        } else if (t.match(/[123]/)) 
            bulletColor = colors.red;
        else if (t.match(/[456]/)) 
            bulletColor = colors.green;
        else if (t.match(/[7]/)) 
            bulletColor = colors.purple;
        else if (t.match(/[T]/)) 
            bulletColor = colors.turquoise;

        let s: React.CSSProperties = {
            backgroundColor: "#" + bulletColor, 
            color: textColor
        };



        return <span className="subway-bullet" style={{...s, ...this.props.style}}>{t}</span>;
    }
}