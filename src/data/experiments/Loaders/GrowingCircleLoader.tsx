import * as React from "react";
import {colors} from '../../themeOptions';

interface IProps {
    size: number
}

const STYLES = {
    verticalAlign: "middle"
};

export const GrowingCircleLoader = (props: IProps) =>
                                <svg
                                    width={props.size} height={props.size}
                                    viewBox={`0 0 ${props.size} ${props.size}`}
                                    style={STYLES}
                                >
                                    <circle
                                        cx={props.size * 0.5}
                                        cy={props.size * 0.5}
                                        r={props.size * 0.25}
                                        fill={colors.blk}
                                    />
                                    <circle
                                        cx={0}
                                        cy={0}
                                        r={props.size * 0.5}
                                        fill={colors.blk}
                                        transform={`translate(${props.size * 0.5} ${props.size * 0.5})`}
                                    >
                                        <animateTransform
                                            attributeName="transform"
                                            type="scale"
                                            additive="sum"
                                            values="0.5 0.5;1 1;0.5 0.5"
                                            begin="0s"
                                            dur="2s"
                                            repeatCount="indefinite"
                                        />
                                        <animate
                                            attributeName="opacity"
                                            values="1;0;1"
                                            begin="0s"
                                            dur="2s"
                                            repeatCount="indefinite"
                                        />
                                    </circle>
                                </svg>;
