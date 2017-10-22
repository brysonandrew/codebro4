import * as React from 'react';
import { observer } from 'mobx-react';
import {IInlineStyles} from '../models';

const STYLES: IInlineStyles = {
    contactInner: {
        position: "absolute",
        top: "50%",
        left: "50%",
        fontSize: 24,
        transform: "translate(-50%, -50%)"
    }
};

@observer
export class Contact extends React.Component<{}, {}> {

    render(): JSX.Element {
        return (
            <div style={STYLES.contactInner}>
                andrew@codebro.io
            </div>
        );
    }
}
