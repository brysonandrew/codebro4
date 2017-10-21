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
                transform: "translate(-50%, -50%)"
            }
        };
    }

    render(): JSX.Element {
        return (
            <div style={Intro.styles}>
                <p>Hi, my name is Andrew. I am a hard-working and creative web-developer.</p>
            </div>
        );
    }
}
