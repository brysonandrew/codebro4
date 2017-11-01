import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, colors, prefixer } from '..';
import { InternalLink, UnderlineSwitch } from '../../widgets';

@observer
export class Experiments extends React.Component<{}, {}> {

    STYLES: IInlineStyles = {
        p: prefixer({
            id: "gallery",
            position: "absolute",
            top: "50%",
            left: "50%",
            textAlign: "center",
            padding: 20,
            fontSize: 24,
            color: colors.blk,
            background: "rgba(255,255,255, 0.88)",
            transform: "translate(-50%, -50%)"
        }),
        image: {
            display: "inline-block",
            verticalAlign: "middle",
            height: 24,
            width: "auto"
        },
        midPoint: {
            fontSize: 14
        }
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.p}>
                <InternalLink
                    path="https://codepen.io/codebro/"
                    isNewPage={true}
                >
                    <UnderlineSwitch
                        height={1}
                    >
                        <span>Check out my </span>
                        <img
                            style={this.STYLES.image}
                            src="/images/codepen.png"
                            alt="Codepen Link"
                        />
                        <span>channel for code experiments.</span>
                    </UnderlineSwitch>
                </InternalLink>
                <div style={this.STYLES.midPoint}>
                    - OR -
                </div>
                <InternalLink
                    path="lab-menu"
                >
                    <UnderlineSwitch
                        height={1}
                    >
                        Click here to see some work in progress.
                    </UnderlineSwitch>
                </InternalLink>
            </div>
        );
    }
}
