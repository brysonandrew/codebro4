import * as React from 'react';
import { observer } from 'mobx-react';

interface IProps {}

interface IState {}

@observer
export class Empty extends React.Component<IProps, IState> {

    render(): JSX.Element {
        return (
            <div/>
        );
    }
}
