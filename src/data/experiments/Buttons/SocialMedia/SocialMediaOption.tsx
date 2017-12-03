import * as React from 'react';
import { observer } from 'mobx-react';

interface IProps {}

interface IState {
    isLoading: boolean
}

@observer
export class SocialMediaOption extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isLoading: false
        }
    }

    render(): JSX.Element {
        return (
            <div/>
        );
    }
}