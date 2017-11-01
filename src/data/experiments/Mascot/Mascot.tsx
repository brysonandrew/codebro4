import * as React from 'react';
import {MascotArmLeft} from './MascotArmLeft';
import {MascotArmRight} from './MascotArmRight';
import {MascotBody} from './MascotBody';
import {MascotFilter} from './defs/MascotFilter';
import {MascotGradient} from './defs/MascotGradient';
import {EStage} from './index';
import {MascotBackground} from './MascotBackground';

interface IProps {
    stage: number
}

export class Mascot extends React.Component<IProps, {}> {

    render(): JSX.Element {
        return (
            <svg width="750" height="750" viewBox="0 0 150 150">
                <MascotBackground>
                    <MascotArmLeft
                        stage={this.props.stage}
                    />
                    <MascotArmRight/>
                    <MascotBody/>
                </MascotBackground>
                <defs>
                    <MascotFilter/>
                    <MascotGradient/>
                </defs>
            </svg>
        );
    }
}
