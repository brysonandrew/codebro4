import * as React from "react";

interface IProps {
    size: number
}

const BASE_SIZE = 100;

const BOX_CONFIGS = (size: number) => [
    // First row
    { x: 0,   y: 0,         color: "#000000" },
    { x: 0,   y: size,      color: "#000000" },
    { x: 0,   y: size * 2,  color: "#000000" },
    // Second row
    { x: size, y: 0,        color: "#000000" },
    { x: size, y: 100,      color: "#000000" },
    { x: size, y: size * 2, color: "#000000" },
    // Third row
    { x: size * 2, y: 0,        color: "#000000" },
    { x: size * 2, y: size,     color: "#000000" },
    { x: size * 2, y: size * 2, color: "#000000" },
];

export const BoxLoader = (props: IProps) =>
                                <svg
                                    width={props.size || BASE_SIZE} height={props.size || BASE_SIZE}
                                    viewBox={`0 0 ${props.size || BASE_SIZE} ${props.size || BASE_SIZE}`}
                                >
                                    {BOX_CONFIGS(props.size / 3).map((config, i) =>
                                        <rect
                                            key={`rect-${i}`}
                                            x={props.size ? config.x * props.size / BASE_SIZE : config.x}
                                            y={props.size ? config.y * props.size / BASE_SIZE : config.y }
                                            width={(props.size || BASE_SIZE) / 3}
                                            height={(props.size || BASE_SIZE) / 3}
                                            fill={config.color}
                                        >
                                            <animate
                                                attributeType="XML"
                                                attributeName="opacity"
                                                values="1;0;1"
                                                dur="4s"
                                                begin={i - BOX_CONFIGS.length * Math.random()}
                                                repeatCount="indefinite"
                                            />
                                        </rect>)}
                                </svg>;
