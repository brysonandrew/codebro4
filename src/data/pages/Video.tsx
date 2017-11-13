import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, prefixer } from '..';
import { ExternalLink, UnderlineSwitch } from '../../widgets';

@observer
export class Video extends React.Component<{}, {}> {

    STYLES: IInlineStyles = {
        video: prefixer({
            id: "video",
            position: "absolute",
            top: "50%",
            left: "50%",
            textAlign: "center",
            transform: "translate(-50%, -50%)"
        }),
        video__image: {
            display: "inline-block",
            paddingLeft: 4,
            verticalAlign: "middle",
            height: 24,
            width: "auto"
        }
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.video}>
                <UnderlineSwitch>
                    <ExternalLink
                        path="https://www.youtube.com/channel/UCF1SvsAZTJL4Bw9qj0hdNLA"
                    >
                        Check out my
                        <img
                            style={this.STYLES.video__image}
                            src="/images/youtube.png"
                            alt="Youtube Link"
                        />
                        <span> channel for coding tips and tutorials.</span>
                    </ExternalLink>
                </UnderlineSwitch>
            </div>
        );
    }
}
