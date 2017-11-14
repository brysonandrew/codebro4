import * as React from 'react';

const STYLE = {
    display: "block",
    width: 50,
    height: 80,
    margin: 20
};

export const ThreeBarLoader = () => {

    return (
        <svg style={STYLE}>
            <rect x="20" y="50" width="4" height="10" fill="#000000">
                <animateTransform attributeType="xml"
                                  attributeName="transform" type="translate"
                                  values="0 0; 0 20; 0 0"
                                  begin="0" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="30" y="50" width="4" height="10" fill="#000000">
                <animateTransform attributeType="xml"
                                  attributeName="transform" type="translate"
                                  values="0 0; 0 20; 0 0"
                                  begin="0.2s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="40" y="50" width="4" height="10" fill="#000000">
                <animateTransform attributeType="xml"
                                  attributeName="transform" type="translate"
                                  values="0 0; 0 20; 0 0"
                                  begin="0.4s" dur="0.6s" repeatCount="indefinite" />
            </rect>
        </svg>
    );
};
