import * as React from 'react';
import { observer } from 'mobx-react';
import { Mascot } from "./Mascot";

export enum EPose {
    // inline
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
    HIGHLY_DISAPPROVE =               'highly_disapprove.svg',
    // img
    BLINK =                           'blink.svg',
    THUMBS_UP_SMILE_01 =              'thumbs_up_smile_01.svg',
    THUMBS_UP_WINK_LEFT_EYE =         'thumbs_up_wink_left_eye.svg'
}

const NUMBER_OF_POSES = Object.keys(EPose).length;

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
                    <img src={`/images/mascot/${EPose[Object.keys(EPose)[this.state.stage]]}`}/>
                </div>
                <div>
                    <input
                        style={STYLES.slider}
                        type="range"
                        min={0}
                        max={NUMBER_OF_POSES - 1}
                        value={this.state.stage}
                        onChange={this.handleMoodChange}
                    />
                </div>
                <div>
                    {EPose[Object.keys(EPose)[this.state.stage]]}
                </div>
                <div>
                    {Number(this.state.stage) + 1}
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
export { MascotBody } from "./MascotBody";
export { MascotBackground } from "./MascotBackground";
export { MascotFilter } from "./defs/MascotFilter";
export { MascotGradient } from "./defs/MascotGradient";
