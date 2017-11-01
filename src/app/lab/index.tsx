import * as React from 'react';
import { observer } from 'mobx-react';
import { EXPERIMENTS_DICT, IInlineStyles } from '../../data';

interface IProps {
    activePage: string
}

@observer
export class Lab extends React.Component<IProps, {}> {

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

    render(): JSX.Element {
        return (
            <div style={this.STYLES.p}>
                <div style={this.STYLES.wrapper}>
                    {EXPERIMENTS_DICT[this.props.activePage].component}
                </div>
            </div>
        );
    }
}
