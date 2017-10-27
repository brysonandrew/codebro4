import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, colors, prefixer } from '..';

@observer
export class Gallery extends React.Component<{}, {}> {

    STYLES: IInlineStyles = {
        gallery: prefixer({
            id: "gallery",
            position: "absolute",
            top: "50%",
            left: "50%",
            textAlign: "center",
            transform: "translate(-50%, -50%)"
        }),
        gallery__link: {
            display: "inline-block",
            fontSize: 24,
            fontFamily: "'Inconsolata', 'arial', sans-serif",
            width: "50%",
            padding: 20,
            background: "rgba(255,255,255, 0.88)",
            color: colors.blk,
            textDecoration: "none"
        },
        gallery__image: {
            display: "inline-block",
            verticalAlign: "middle",
            height: 24,
            width: "auto"
        }
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.gallery}>
                <a
                    href="https://www.instagram.com/codebrolab"
                    style={this.STYLES.gallery__link}
                    target="_blank"
                >
                    <span>Check out my </span>
                    <img
                        style={this.STYLES.gallery__image}
                        src="/images/instagram.svg"
                        alt="Instagram Link"
                    />
                    <span> channel for coding tips and tutorials.</span>
                </a>
            </div>
        );
    }
}
