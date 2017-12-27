import * as React from "react";

const iconSizeStyle = {
    display: "inline-block",
    verticalAlign: "top",
    height: 20,
    width: "auto",
    maxWidth: 30
};

export const svgsToIconSize = (svgs: JSX.Element[]) => {
    return svgs.map((svg, i) =>
        <div key={`svg-${i}`} style={iconSizeStyle}>{svg}</div>
    )
};
