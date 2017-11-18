import * as React from "react";

interface IProps {
    size: number
}

const BOX_CONFIGS = (size: number) => [
    // First row
    { x: 0,         y: size,        color: "#50E3C2" },
    { x: 0,         y: size * 2,    color: "#50E3C2" },
    { x: 0,         y: size * 3,    color: "#50E3C2" },
    // Second row
    { x: size,      y: 0,           color: "#A49EFC" },
    { x: size,      y: size * 2,    color: "#A49EFC" },
    // Third row
    { x: size * 2, y: size,         color: "#A49EFC" },
    // Fifth row
    { x: size * 4, y: size,         color: "#A49EFC" },
    // Sixth row
    { x: size * 5, y: 0,            color: "#A49EFC" },
    { x: size * 5, y: size * 2,     color: "#A49EFC" },
    { x: size * 5, y: size * 3,     color: "#50E3C2" }
];

export const BoxLoaderPT = (props: IProps) =>   <svg
                                                    width={props.size} height={props.size}
                                                    viewBox={`0 0 ${props.size} ${props.size}`}
                                                >
                                                    {BOX_CONFIGS(props.size).map((config, i) =>
                                                        <rect
                                                            key={`box-${i}`}
                                                            x={config.x}
                                                            y={config.y}
                                                            width={props.size / 5}
                                                            height={props.size / 5}
                                                            fill={config.color}
                                                        >
                                                            <animate
                                                                attributeType="XML"
                                                                attributeName="opacity"
                                                                values="1;0;1"
                                                                dur="4s"
                                                                begin={i + 1 - BOX_CONFIGS(props.size).length * Math.random()}
                                                                repeatCount="indefinite"
                                                            />
                                                        </rect>)}
                                                </svg>;
