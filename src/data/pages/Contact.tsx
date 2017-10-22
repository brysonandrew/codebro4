import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, colors } from '..';

@observer
export class Contact extends React.Component<{}, {}> {

    STYLES: IInlineStyles = {
        contact: {
            id: "contact",
            position: "absolute",
            top: "50%",
            left: "50%",
            textAlign: "center",
            padding: 20,
            background: "rgba(255,255,255, 0.88)",
            transform: "translate(-50%, -50%)",
            cursor: "pointer"
        },
        contact__text: {
            display: "inline-block",
            fontSize: 24,
            fontFamily: "'Inconsolata', 'arial', sans-serif",
            width: "100%",
            color: colors.blk,
            textDecoration: "none"
        }
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.contact}>
                <a
                    style={this.STYLES.contact__text}
                    href="mailto:andrew@codebro.io"
                >
                    andrew@codebro.io
                </a>
            </div>
        );
    }
}
