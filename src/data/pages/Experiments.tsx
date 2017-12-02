import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, prefixer } from '..';
import { InternalLink, UnderlineSwitch } from '../../widgets';

@observer
export class Experiments extends React.Component<{}, {}> {

    STYLES: IInlineStyles = {
        p: prefixer({
            id: "experiments",
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
            <div style={this.STYLES.p}>
                Here you will find some code experiments that I have been working on, either for clients or just for fun.
                <div style={this.STYLES.button}>
                    <UnderlineSwitch>
                        <InternalLink
                            path="lab-menu"
                        >
                            Go to lab →
                        </InternalLink>
                    </UnderlineSwitch>
                </div>
            </div>
        );
    }
}
