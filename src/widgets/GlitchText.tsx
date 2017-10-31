import * as React from 'react';
import { prefixer } from '../data/helpers/prefixer';

interface IProps extends IFilterProps {
    fontSize: number
    width: number
    height: number
    isActive: boolean
    textColor: string
    textContent: string
}

interface IFilterProps {
    backgroundColor: string
    intensity?: number
}

export const glitchFilter = (props: IFilterProps) => {

    if (!props.intensity) {
        props.intensity = 1;
    }

    return  <filter id="filter">
                <feFlood floodColor={props.backgroundColor} result={props.backgroundColor}/>
                <feFlood floodColor="red" result="flood1"/>
                <feFlood floodColor="limegreen" result="flood2"/>
                <feOffset in="SourceGraphic" dx="3" dy="0" result="off1a"/>
                <feOffset in="SourceGraphic" dx="2" dy="0" result="off1b"/>
                <feOffset in="SourceGraphic" dx="-3" dy="0" result="off2a"/>
                <feOffset in="SourceGraphic" dx="-2" dy="0" result="off2b"/>
                <feComposite in="flood1" in2="off1a" operator="in" result="comp1"/>
                <feComposite in="flood2" in2="off2a" operator="in" result="comp2"/>

                <feMerge x="0" width="100%" result="merge1">
                    <feMergeNode in={props.backgroundColor}/>
                    <feMergeNode in="comp1"/>
                    <feMergeNode in="off1b"/>

                    <animate
                        attributeName="y"
                        id="y"
                        dur="4s"

                        values={`${props.intensity *  props.intensity * 104}px; ${props.intensity *  props.intensity * 104}px; ${props.intensity *  props.intensity * 30}px; ${props.intensity *  props.intensity * 105}px; ${props.intensity *  props.intensity * 30}px; ${props.intensity *  props.intensity * 2}px; ${props.intensity *  props.intensity * 2}px; ${props.intensity *  props.intensity * 50}px; ${props.intensity *  props.intensity * 40}px; ${props.intensity *  props.intensity * 105}px; ${props.intensity *  props.intensity * 105}px; ${props.intensity *  props.intensity * 20}px; ${props.intensity *  props.intensity * 68}px; ${props.intensity *  props.intensity * 40}px; ${props.intensity *  props.intensity * 104}px; ${props.intensity *  props.intensity * 40}px; ${props.intensity *  props.intensity * 70}px; ${props.intensity *  props.intensity * 10}px; ${props.intensity *  props.intensity * 30}px; ${props.intensity *  props.intensity * 104}px; ${props.intensity *  props.intensity * 102}px`}

                        keyTimes='0; 0.362; 0.368; 0.421; 0.440; 0.477; 0.518; 0.564; 0.593; 0.613; 0.644; 0.693; 0.721; 0.736; 0.772; 0.818; 0.844; 0.894; 0.925; 0.939; 1'

                        repeatCount="indefinate"

                    />

                    <animate attributeName="height"
                             id="h"
                             dur="4s"

                             values={`${props.intensity *  props.intensity * 10}px; 0px; ${props.intensity *  props.intensity * 10}px; ${props.intensity *  props.intensity * 30}px; ${props.intensity *  props.intensity * 50}px; 0px; ${props.intensity *  props.intensity * 10}px; 0px; 0px; 0px; ${props.intensity *  props.intensity * 10}px; ${props.intensity *  props.intensity * 50}px; ${props.intensity *  props.intensity * 40}px; 0px; 0px; 0px; ${props.intensity *  props.intensity * 40}px; ${props.intensity *  props.intensity * 30}30px; ${props.intensity *  props.intensity * 10}px; 0px; ${props.intensity *  props.intensity * 50}px`}

                             keyTimes='0; 0.362; 0.368; 0.421; 0.440; 0.477; 0.518; 0.564; 0.593; 0.613; 0.644; 0.693; 0.721; 0.736; 0.772; 0.818; 0.844; 0.894; 0.925; 0.939; 1'

                             repeatCount="indefinite"

                    />
                </feMerge>

                <feMerge x="0" width="100%" y="60px" height="65px" result="merge2">
                    <feMergeNode in={props.backgroundColor}/>
                    <feMergeNode in="comp2"/>
                    <feMergeNode in="off2b"/>

                    <animate attributeName="y"
                             id="y"
                             dur="4s"
                             values={`${props.intensity *  props.intensity * 103}px; ${props.intensity *  props.intensity * 104}px; ${props.intensity *  props.intensity * 69}px; ${props.intensity *  props.intensity * 53}px; ${props.intensity *  props.intensity * 42}px; ${props.intensity *  props.intensity * 104}px; ${props.intensity *  props.intensity * 78}px; ${props.intensity *  props.intensity * 89}px; ${props.intensity *  props.intensity * 96}px; ${props.intensity *  props.intensity * 100}px; ${props.intensity *  props.intensity * 67}px; ${props.intensity *  props.intensity * 50}px; ${props.intensity *  props.intensity * 96}px; ${props.intensity *  props.intensity * 66}px; ${props.intensity *  props.intensity * 88}px; ${props.intensity *  props.intensity * 42}px; ${props.intensity *  props.intensity * 13}px; ${props.intensity *  props.intensity * 100}px; ${props.intensity *  props.intensity * 100}px; ${props.intensity *  props.intensity * 104}px;`}

                             keyTimes='0; 0.055; 0.100; 0.125; 0.159; 0.182; 0.202; 0.236; 0.268; 0.326; 0.357; 0.400; 0.408; 0.461; 0.493; 0.513; 0.548; 0.577; 0.613; 1'

                             repeatCount="indefinite"

                    />

                    <animate attributeName="height"
                             id="h"
                             dur="4s"

                             values={`0px; 0px; 0px; ${props.intensity *  props.intensity * 16}px; ${props.intensity *  props.intensity * 16}16px; ${props.intensity *  props.intensity * 12}12px; ${props.intensity *  props.intensity * 12}12px; 0px; 0px; ${props.intensity *  props.intensity * 5}5px; ${props.intensity *  props.intensity * 10}10px; ${props.intensity *  props.intensity * 22}22px; ${props.intensity *  props.intensity * 33}33px; ${props.intensity *  props.intensity * 11}11px; 0px; 0px; ${props.intensity *  props.intensity * 10}px`}

                             keyTimes='0; 0.055; 0.100; 0.125; 0.159; 0.182; 0.202; 0.236; 0.268; 0.326; 0.357; 0.400; 0.408; 0.461; 0.493; 0.513;  1'

                             repeatCount="indefinite"

                    />
                </feMerge>

                <feMerge>
                    <feMergeNode in="SourceGraphic"/>

                    <feMergeNode in="merge1"/>
                    <feMergeNode in="merge2"/>

                </feMerge>
            </filter>
};

export const GlitchText = (props: IProps) => {

    return (
        <svg width={`${props.width}px`} height={`${props.height}px`} viewBox={`0 0 ${props.width} ${props.height}`}>
            <defs>
                {glitchFilter({
                    backgroundColor: props.backgroundColor,
                    intensity: props.intensity
                })}
            </defs>
            <g>
                <text
                    x="0"
                    y={props.height * 0.75}
                    style={prefixer({
                        filter: props.isActive ? "url(#filter)" : "none",
                        fill: props.textColor,
                        fontSize: props.fontSize,
                        fontSmooth: "always",
                        WebkitFontSmoothing: "antialiased",
                        MozOsxFontSmoothing: "grayscale"
                    })}
                >
                    {props.textContent}
                </text>
            </g>
        </svg>
    );
};
