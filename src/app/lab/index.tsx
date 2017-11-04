import * as React from 'react';
import { observer } from 'mobx-react';
import { EXPERIMENTS_DICT, IInlineStyles } from '../../data';

interface IProps {
    activePage: string
}

interface IState {
    isMounted: boolean
}

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
            <div style={this.STYLES.p}>
                <div style={this.STYLES.wrapper} ref={(el) => this.parentRef = el}>
                    {this.state.isMounted
                        ?  React.cloneElement(
                                EXPERIMENTS_DICT[this.props.activePage].component,
                                {
                                    parentEl: this.parentRef,
                                }
                            )
                        :   null}
                </div>
            </div>
        );
    }
}
