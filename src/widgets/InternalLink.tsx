import * as React from 'react';
import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import { colors } from '../data';

interface IProps {
    path: string
    color?: string
}

@observer
export class InternalLink extends React.Component<IProps, {}> {

    STYLES = {
        p: {
            display: "inline-block",
            cursor: "pointer",
            textDecoration: "none",
            color: this.props.color || colors.wht,
            maxWidth: 320
        }
    };

    handleClick() {
        browserHistory.push(`/${this.props.path}`);
    }

    render(): JSX.Element {
        return (
            <div
                style={this.STYLES.p}
                onClick={() => this.handleClick()}
            >
                {this.props.children}
            </div>
        );
    }
}
