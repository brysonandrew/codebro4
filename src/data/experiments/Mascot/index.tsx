import { Mascot } from "./Mascot";

import * as React from 'react';
import { observer } from 'mobx-react';

export enum EStage {
    MONEY =                           'money.svg',
    APPROVE_WITH_SMILE_HANDS_UP_03 =  'approve_with_smile_hands_up_03.svg',
    APPROVE_WITH_SMILE_HANDS_UP_02 =  'approve_with_smile_hands_up_02.svg',
    APPROVE_WITH_SMILE_HANDS_UP_01 =  'approve_with_smile_hands_up_01.svg',
    APPROVE_WITH_SMILE_02 =           'approve_with_smile_02.svg',
    APPROVE_WITH_SMILE_01 =           'approve_with_smile_01.svg',
    APPROVE =                         'approve.svg',
    NEUTRAL =                         'neutral.svg',
    SLIGHTLY_APPROVE =                'slightly_approve.svg',
    NOT_AMUSED =                      'not_amused.svg',
    SLIGHTLY_DISAPPROVE =             'slightly_disapprove.svg',
    DISAPPROVE =                      'disapprove.svg',
    HIGHLY_DISAPPROVE =               'highly_disapprove.svg'
}

const NUMBER_OF_STAGES = Object.keys(EStage).length;

const STYLES = {
    p: {
        width: "100%",
        textAlign: "center"
    },
    slider: {
        display: "inline-block",
        margin: "20px 0"
    }
};

interface IState {
    stage: number
}

@observer
class MascotControls extends React.Component<{}, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            stage: 0
        };
    }

    private handleMoodChange = ({target: {value}}) => {
        this.setState({
            stage: value
        });
    };

    render(): JSX.Element {
        return (
            <div style={STYLES.p}>
                <div>
                    <img src={`/images/mascot/${EStage[Object.keys(EStage)[this.state.stage]]}`}/>
                </div>
                <div>
                    <input
                        style={STYLES.slider}
                        type="range"
                        min={EStage.MONEY}
                        max={NUMBER_OF_STAGES}
                        value={this.state.stage}
                        onChange={this.handleMoodChange}
                    />
                </div>
                <Mascot
                    stage={this.state.stage}
                />
            </div>
        );
    }
}

export { Mascot };
export { MascotControls };
export { MascotArmLeft } from "./MascotArmLeft";
export { MascotArmRight } from "./MascotArmRight";
export { MascotBody } from "./MascotBody";
export { MascotMouth } from "./MascotMouth";
export { MascotBackground } from "./MascotBackground";
export { MascotFilter } from "./defs/MascotFilter";
export { MascotGradient } from "./defs/MascotGradient";
