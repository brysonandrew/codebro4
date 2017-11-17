import * as React from "react";

const SIZE = 100;

const BOX_CONFIGS = [
    // First row
    { x: 0,   y: 100, color: "#50E3C2" },
    { x: 0,   y: 200, color: "#50E3C2" },
    { x: 0,   y: 300, color: "#50E3C2" },
    // Second row
    { x: 100, y: 0,   color: "#A49EFC" },
    { x: 100, y: 200, color: "#A49EFC" },
    // Third row
    { x: 200, y: 100, color: "#A49EFC" },
    // Fifth row
    { x: 400, y: 100, color: "#A49EFC" },
    // Sixth row
    { x: 500, y: 0,   color: "#A49EFC" },
    { x: 500, y: 200, color: "#A49EFC" },
    { x: 500, y: 300, color: "#50E3C2" },

];

export const BoxLoaderPT = () =>  <svg
                                        width={SIZE} height={SIZE}
                                        viewBox={`0 0 ${SIZE} ${SIZE}`}
                                    >
                                    {BOX_CONFIGS.map((config, i) =>
                                        <rect
                                            x={config.x}
                                            y={config.y}
                                            width={SIZE}
                                            height={SIZE}
                                            fill={config.color}
                                        >
                                            <animate
                                                attributeType="XML"
                                                attributeName="opacity"
                                                values="1;0;1"
                                                dur="4s"
                                                begin={i + 1 - BOX_CONFIGS.length * Math.random()}
                                                repeatCount="indefinite"
                                            />
                                        </rect>)}
                                </svg>;
