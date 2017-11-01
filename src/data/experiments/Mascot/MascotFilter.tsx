import * as React from 'react';
import {MascotArmLeft} from './MascotArmLeft';
import {MascotArmRight} from './MascotArmRight';
import {MascotBody} from './MascotBody';

interface IProps {}

interface IState {}

export class MascotFilter extends React.Component<IProps, IState> {

    render(): JSX.Element {
        return (
            <filter id="filter0_i" filterUnits="userSpaceOnUse" x="798" y="5556" width="53" height="82" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 255 0" result="hardAlpha"/>
                <feOffset dx="0" dy="3"/>
                <feGaussianBlur stdDeviation="1.5"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.064906 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
            </filter>
        );
    }
}
