import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, colors, prefixer } from '..';

@observer
export class Lab extends React.Component<{}, {}> {

    STYLES: IInlineStyles = {
        p: prefixer({
            id: "gallery",
            position: "absolute",
            top: "50%",
            left: "50%",
            textAlign: "center",
            transform: "translate(-50%, -50%)"
        }),
        link: {
            display: "inline-block",
            fontSize: 24,
            fontFamily: "'Inconsolata', 'arial', sans-serif",
            width: "50%",
            padding: 20,
            background: "rgba(255,255,255, 0.88)",
            color: colors.blk,
            textDecoration: "none"
        },
        image: {
            display: "inline-block",
            verticalAlign: "middle",
            height: 24,
            width: "auto"
        }
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.p}>
                <a
                    href="https://codepen.io/codebro/"
                    style={this.STYLES.link}
                    target="_blank"
                >
                    <span>Check out my </span>
                    <img
                        style={this.STYLES.image}
                        src="/images/codepen.png"
                        alt="Codepen Link"
                    />
                    <span> channel for code experiments.</span>
                </a>
            </div>
        );
    }
}
