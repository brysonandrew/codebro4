import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles } from '..';

@observer
export class Intro extends React.Component<{}, {}> {

    STYLES: IInlineStyles = {
        intro: {
            id: "intro",
            position: "absolute",
            top: "50%",
            left: "50%",
            textAlign: "center",
            transform: "translate(-50%, -50%)"
        },
        intro__text: {
            display: "inline-block",
            padding: 20,
            background: "rgba(255,255,255, 0.88)",
            fontSize: 24,
            fontFamily: "'Inconsolata', 'arial', sans-serif",
            width: "50%"
        }
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.intro}>
                <p style={this.STYLES.intro__text}>
                    Hi, my name is Andrew and I make websites.
                </p>
            </div>
        );
    }
}
