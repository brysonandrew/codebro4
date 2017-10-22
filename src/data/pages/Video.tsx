import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, colors } from '..';

@observer
export class Video extends React.Component<{}, {}> {

    STYLES: IInlineStyles = {
        video: {
            id: "video",
            position: "absolute",
            top: "50%",
            left: "50%",
            textAlign: "center",
            transform: "translate(-50%, -50%)"
        },
        video__link: {
            display: "inline-block",
            fontSize: 24,
            fontFamily: "'Inconsolata', 'arial', sans-serif",
            width: "50%",
            padding: 20,
            background: "rgba(255,255,255, 0.88)",
            color: colors.blk,
            textDecoration: "none"
        },
        video__image: {
            display: "inline-block",
            verticalAlign: "middle",
            height: 24,
            width: "auto"
        }
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.video}>
                <a
                    href="https://www.youtube.com/channel/UCF1SvsAZTJL4Bw9qj0hdNLA"
                    style={this.STYLES.video__link}
                    target="_blank"
                >
                    <span>Check out my </span>
                    <img
                        style={this.STYLES.video__image}
                        src="/images/youtube.png"
                        alt="Youtube Link"
                    />
                    <span> channel for coding tips and tutorials.</span>
                </a>
            </div>
    );
    }
}
