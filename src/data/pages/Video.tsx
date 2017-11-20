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
            maxWidth: 320,
            fontSize: 20,
            textAlign: "left",
            transform: "translate(-50%, -50%)"
        }),
        button: {
            textAlign: "center"
        }
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.video}>
                Coming from a teaching background, I enjoy sharing my knowledge of coding through video.
                <div style={this.STYLES.button}>
                    <UnderlineSwitch>
                        <ExternalLink
                            path="https://www.youtube.com/channel/UCF1SvsAZTJL4Bw9qj0hdNLA"
                        >
                            Go to channel →
                        </ExternalLink>
                    </UnderlineSwitch>
                </div>
            </div>
        );
    }
}
