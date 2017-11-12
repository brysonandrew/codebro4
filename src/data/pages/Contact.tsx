import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, colors, prefixer } from '..';
import {UnderlineSwitch} from '../../widgets/UnderlineSwitch';

@observer
export class Contact extends React.Component<{}, {}> {

    STYLES: IInlineStyles = {
        contact: prefixer({
            id: "contact",
            position: "absolute",
            top: "50%",
            left: "50%",
            textAlign: "center",
            padding: 20,
            color: colors.wht,
            // background: "rgba(255,255,255, 0.88)",
            transform: "translate(-50%, -50%)",
            cursor: "pointer"
        }),
        contact__text: {
            display: "inline-block",
            fontSize: 24,
            fontFamily: "'Inconsolata', 'arial', sans-serif",
            width: "100%",
            color: colors.wht,
            textDecoration: "none"
        }
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.contact}>
                <UnderlineSwitch
                    height={1}
                    underlineColor={colors.wht}
                >
                    <a
                        style={this.STYLES.contact__text}
                        href="mailto:andrew@codebro.io"
                    >
                        andrew@codebro.io
                    </a>
                </UnderlineSwitch>
            </div>
        );
    }
}
