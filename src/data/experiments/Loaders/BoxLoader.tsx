import * as React from "react";

interface IProps {
    size?: number
}

const BASE_SIZE = 300;

const BOX_CONFIGS = [
    // First row
    { x: 0,   y: 0,   color: "#000000" },
    { x: 0,   y: 100, color: "#000000" },
    { x: 0,   y: 200, color: "#000000" },
    // Second row
    { x: 100, y: 0,   color: "#000000" },
    { x: 100, y: 100, color: "#000000" },
    { x: 100, y: 200, color: "#000000" },
    // Third row
    { x: 200, y: 0,   color: "#000000" },
    { x: 200, y: 100, color: "#000000" },
    { x: 200, y: 200, color: "#000000" },
];

export const BoxLoader = (props: IProps) =>
                                <svg
                                    width={props.size || BASE_SIZE} height={props.size || BASE_SIZE}
                                    viewBox={`0 0 ${props.size || BASE_SIZE} ${props.size || BASE_SIZE}`}
                                >
                                    {BOX_CONFIGS.map((config, i) =>
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
