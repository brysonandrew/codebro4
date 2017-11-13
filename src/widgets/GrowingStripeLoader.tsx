import * as React from 'react';

const STYLE = {
    display: "block",
    width: "100%",
    height: 80,
    margin: 20
};

export const GrowingStripeLoader = () => {

    return (
        <svg style={STYLE}>
            <line x1="0" y1="0" x2="100%" y2="0" strokeWidth="2" stroke="black"/>
        </svg>
    );
};
