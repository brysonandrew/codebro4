import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { EXPERIMENTS_DICT, IInlineStyles, Store } from '../../data';

interface IProps {
    store?: Store
    activePage: string
}

interface IState {
    isMounted: boolean
}

@inject('store')
@observer
export class Lab extends React.Component<IProps, IState> {

    parentRef: HTMLDivElement;

    STYLES: IInlineStyles = {
        p: {
            id: "lab",
            position: "relative",
            width: "100%",
            height: "100vh"
        },
        wrapper: {
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
        }
    };

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false
        };
    }

    componentDidMount() {
        this.setState({
            isMounted: true
        })
    }

    render(): JSX.Element {
        return (
            <div style={this.STYLES.p} ref={(el) => this.parentRef = el}>
                {this.state.isMounted
                    ?  React.cloneElement(
                        EXPERIMENTS_DICT[this.props.activePage].component,
                        {
                            parentEl: this.parentRef,
                            width: this.props.store.width,
                            height: this.props.store.height,
                            savedParams: this.props.store.savedParams
                        }
                    )
                    :   null}
            </div>
        );
    }
}
