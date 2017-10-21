import * as React from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { IInlineStyles } from '../models';

@observer
export class Home extends React.Component<{}, {}> {

    @computed static get styles(): IInlineStyles {
        return {
            homeInner: {
                position: "absolute",
                top: "66%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            }
        };
    }

    render(): JSX.Element {
        return (
            <h1 style={Home.styles.homeInner}>
                code bro
            </h1>
        );
    }
}
