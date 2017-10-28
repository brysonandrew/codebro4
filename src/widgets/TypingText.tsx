import * as React from 'react';
import { colors } from '../data/themeOptions';

interface IAnimationConfig {
    dur: string
    begin: string
    repeatCount: string
}

interface IProps {
    animationConfig: IAnimationConfig
    textContent: string
}

export const TypingText = (props: IProps) => {
    return (
        <svg width="300" height="50" viewBox="0 0 300 50">
            <path id={props.textContent}>
                <animate attributeName="d" from="m0,25 h0" to="m0,25 h300" fill="freeze" {...props.animationConfig}/>
            </path>
            <text fontSize="24" fill={colors.blk}>
                <textPath xlinkHref={`#${props.textContent}`}>
                    {props.textContent}
                </textPath>
            </text>
        </svg>
    );
};
