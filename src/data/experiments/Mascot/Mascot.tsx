import * as React from 'react';
import {
    MascotArmLeft_1,
    MascotArmLeft_2,
    MascotArmLeft_3,
    MascotArmLeft_4,
    MascotArmLeft_5,
    MascotArmLeft_6,
    MascotArmLeft_7,
    MascotArmLeft_8,
    MascotArmLeft_9,
    MascotArmLeft_10,
    MascotArmLeft_11,
    MascotArmLeft_12,
    MascotArmLeft_13
} from './left-arms';
import {
    MascotArmRight_1,
    MascotArmRight_2,
    MascotArmRight_3,
    MascotArmRight_4,
    MascotArmRight_5,
    MascotArmRight_6,
    MascotArmRight_7,
    MascotArmRight_8,
    MascotArmRight_9,
    MascotArmRight_10,
    MascotArmRight_11,
    MascotArmRight_12,
    MascotArmRight_13
} from './right-arms';
import {MascotBody} from './MascotBody';
import {MascotFilter} from './defs/MascotFilter';
import {MascotGradient} from './defs/MascotGradient';
import {MascotBackground} from './MascotBackground';

const LEFT_ARMS = [
    <MascotArmLeft_1/>,
    <MascotArmLeft_2/>,
    <MascotArmLeft_3/>,
    <MascotArmLeft_4/>,
    <MascotArmLeft_5/>,
    <MascotArmLeft_6/>,
    <MascotArmLeft_7/>,
    <MascotArmLeft_8/>,
    <MascotArmLeft_9/>,
    <MascotArmLeft_10/>,
    <MascotArmLeft_11/>,
    <MascotArmLeft_12/>,
    <MascotArmLeft_13/>
];

const RIGHT_ARMS = [
    <MascotArmRight_1/>,
    <MascotArmRight_2/>,
    <MascotArmRight_3/>,
    <MascotArmRight_4/>,
    <MascotArmRight_5/>,
    <MascotArmRight_6/>,
    <MascotArmRight_7/>,
    <MascotArmRight_8/>,
    <MascotArmRight_9/>,
    <MascotArmRight_10/>,
    <MascotArmRight_11/>,
    <MascotArmRight_12/>,
    <MascotArmRight_13/>
];

interface IProps {
    stage: number
}

export class Mascot extends React.Component<IProps, {}> {

    componentDidMount() {
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.type = 'text/css';
        link.href = `/images/mascot/style.css`;
        document.head.appendChild(link);
    }

    render(): JSX.Element {
        return (
            <svg width="750" height="750" viewBox="0 0 150 150">
                <MascotBackground>
                    <MascotBody/>
                </MascotBackground>
                <g className="mascot__arms" transform="translate(-750 -5312)">
                    <g transform="translate(12 30)">
                        {LEFT_ARMS[this.props.stage]}
                    </g>
                    <g transform="translate(80 16)">
                        {RIGHT_ARMS[this.props.stage]}
                    </g>
                </g>
                <defs>
                    <MascotFilter/>
                    <MascotGradient/>
                </defs>
            </svg>
        );
    }
}
