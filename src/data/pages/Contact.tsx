import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, prefixer } from '..';
import { UnderlineSwitch, ExternalLink } from '../../widgets';

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
            transform: "translate(-50%, -50%)",
            cursor: "pointer"
        })
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.contact}>
                <UnderlineSwitch>
                    <ExternalLink
                        path="mailto:andrew@codebro.io"
                    >
                        andrew@codebro.io
                    </ExternalLink>
                </UnderlineSwitch>
            </div>
        );
    }
}
