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

export const TypingTextSVG = (props: IProps) => {
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
            >
                <animate
                    attributeName="d"
                    from={`m0,${props.height * 0.5} h0`}
                    to={`m0,${props.height * 0.5} h${props.width}`}
                    fill="freeze"
                    {...props.animationConfig}
                />
            </path>
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
        </svg>
    );
};
