import * as React from 'react';
import {MascotArmLeft} from '../MascotArmLeft';
import {MascotArmRight} from '../MascotArmRight';
import {MascotBody} from '../MascotBody';

interface IProps {}

interface IState {}

export class MascotGradient extends React.Component<IProps, IState> {

    render(): JSX.Element {
        return (
            <linearGradient id="paint5_linear" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-0.0125902 39.4036 -80.7141 -0.00614636 49.6664 -6.8802)">
                <stop offset="0" stopColor="#FFFFFF"/>
                <stop offset="0.637244" stopColor="#5D5D5D"/>
                <stop offset="0.637244" stopColor="#5D5D5D"/>
                <stop offset="1"/>
            </linearGradient>
        );
    }
}
