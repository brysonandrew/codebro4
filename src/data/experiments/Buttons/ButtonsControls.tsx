import * as React from 'react';
import { observer } from 'mobx-react';

interface IProps {
    button: JSX.Element
    index: number
}

interface IState {
    isOpen: boolean
}

@observer
export class ButtonsControls extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isOpen: false
        }
    }

    handleClick = (e) => {
        this.setState({
            isOpen: !this.state.isOpen
        });
        e.stopPropagation();
    };

    render(): JSX.Element {
        return (
            React.cloneElement(this.props.button,
                {
                    isOpen: this.state.isOpen,
                    onClick: this.handleClick
                })
        );
    }
}
