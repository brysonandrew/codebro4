import * as React from 'react';
import {colors} from '../..';
const ID = (Math.random() * 10000).toFixed(0);

interface IAnimationConfig {
    dur: string
    begin: string
    repeatCount: string
}

interface IProps {
    animationConfig: IAnimationConfig
    textContent: string
    width: number
    height: number
}

export const WrapTextSVG = (props: IProps) => {
    const c = props.width * 2 + props.height * 2;
    return (
        <svg
            width={props.width}
            height={props.height}
            viewBox={`0 0 ${props.width} ${props.height}`}
        >
            <path
                id={ID}
                width={props.width}
                height={props.height}
                d={`m0,${props.height * 0.5} h${props.width}`}
            />
            <text
                fontSize={props.height * 0.5}
                fill={colors.wht}
                width={props.width}
                height={props.height}
            >
                <textPath
                    xlinkHref={`#${ID}`}
                    width={props.width}
                    height={props.height}
                >
                    {props.textContent}
                </textPath>
            </text>
            <rect
                width={props.width}
                height={props.height}
                strokeWidth="1"
                strokeDashoffset={c}
                strokeDasharray={c}
                stroke={colors.wht}
                fill="none"
            >
                <animate
                    attributeName="stroke-dashoffset"
                    from={0}
                    to={c}
                    stroke="freeze"
                    {...props.animationConfig}
                />
            </rect>
        </svg>
    );
};
