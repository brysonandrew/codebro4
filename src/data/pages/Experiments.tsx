import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, prefixer } from '..';
import { ExternalLink, InternalLink, UnderlineSwitch } from '../../widgets';

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
            transform: "translate(-50%, -50%)"
        }),
        image: prefixer(({
            display: "inline-block",
            verticalAlign: "middle",
            height: 24,
            width: "auto",
            filter: "invert(100%)"
        })),
        midPoint: {
            fontSize: 14,
            padding: "6px 0 2px"
        }
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.p}>
                <ExternalLink
                    path="https://codepen.io/codebro/"
                >
                    <UnderlineSwitch>
                        <span>Check out my </span>
                        <img
                            style={this.STYLES.image}
                            src="/images/codepen.png"
                            alt="Codepen Link"
                        />
                        <span>channel for code experiments.</span>
                    </UnderlineSwitch>
                </ExternalLink>
                <div style={this.STYLES.midPoint}>
                    - OR -
                </div>
                <InternalLink
                    path="lab-menu"
                >
                    <UnderlineSwitch>
                        Click here to see some work in progress.
                    </UnderlineSwitch>
                </InternalLink>
            </div>
        );
    }
}
