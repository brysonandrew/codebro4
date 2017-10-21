import * as React from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import {IInlineStyles} from '../models';

@observer
export class Contact extends React.Component<{}, {}> {

    @computed static get styles(): IInlineStyles {
        return {
            contactInner: {
                position: "absolute",
                top: "60%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: 40
            }
        };
    }

    render(): JSX.Element {
        return (
            <div style={Contact.styles.contactInner}>
                andrew@codebro.io
            </div>
        );
    }
}
