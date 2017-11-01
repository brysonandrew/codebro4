import * as React from 'react';
import { observer } from 'mobx-react';
import { Mascot } from './Mascot';
import { EMascotMood } from './mascotSteps';

interface IState {
    currentStep: EMascotMood
}

@observer
export class MascotControls extends React.Component<{}, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            currentStep: EMascotMood.MONEY
        };
    }

    private handleMoodChange = ({target: {value}}) => {
        this.setState({
            currentStep: value
        });
    };

    render(): JSX.Element {
        return (
            <div>
                <div style={{width: "100%", textAlign: "center"}}>
                    <input
                        style={{display: "inline-block"}}
                        type="range"
                        min={0}
                        max={1}
                        value={this.state.currentStep}
                        onChange={this.handleMoodChange}
                    />
                </div>
                <Mascot
                    currentStep={this.state.currentStep}
                />
            </div>
        );
    }
}
