import * as React from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';

interface IProps {}

interface IState {}

@observer
export class ContactInner extends React.Component<IProps, IState> {

    @computed public get styles(): any {
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
    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div style={this.styles.contactInner}>
                andrew@brosyn.com
            </div>
        );
    }
}
