import * as React from 'react';
import {MascotArmLeft} from './MascotArmLeft';
import {MascotArmRight} from './MascotArmRight';
import {MascotBody} from './MascotBody';
import {MascotFilter} from './MascotFilter';
import {MascotGradient} from './MascotGradient';
import {EMascotMood} from './mascotSteps';

interface IProps {
    currentStep: EMascotMood
}

export class Mascot extends React.Component<IProps, {}> {

    render(): JSX.Element {
        return (
            <svg width="750" height="750" viewBox="0 0 150 150">
                <g id="Canvas" transform="translate(-750 -5513)">
                    <clipPath id="clip-0" clipRule="evenodd">
                        <path d="M 750 5513L 900 5513L 900 5663L 750 5663L 750 5513Z" fill="#FFFFFF"/>
                    </clipPath>
                    <g id="Mascot_001 Copy" clipPath="url(#clip-0)">
                        <path d="M 750 5513L 900 5513L 900 5663L 750 5663L 750 5513Z" fill="#FFFFFF"/>
                        <MascotArmLeft
                            currentStep={this.props.currentStep}
                        />
                        <MascotArmRight/>
                        <MascotBody/>
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
