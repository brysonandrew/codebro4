import * as React from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { IInlineStyles } from '../models';

@observer
export class Intro extends React.Component<{}, {}> {

    @computed static get styles(): IInlineStyles {
        return {
            intro: {
                position: "absolute",
                top: "50%",
                left: "50%",
                fontSize: 24,
                transform: "translate(-50%, -50%)"
            }
        };
    }

    render(): JSX.Element {
        return (
            <div style={Intro.styles.intro}>
                <p>Hi, my name is Andrew. and I make websites like the one you are looking at right now.</p>
            </div>
        );
    }
}
