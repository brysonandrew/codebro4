import * as React from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';

interface IProps {}

interface IState {}

@observer
export class HomeInner extends React.Component<IProps, IState> {

    @computed public get styles(): any {
        return {
            homeInner: {
                position: "absolute",
                top: "66%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            }
        };
    }

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <h1 style={this.styles.homeInner}>
                BROSYN
            </h1>
        );
    }
}
