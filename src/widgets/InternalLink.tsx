import * as React from 'react';
import { Link } from 'react-router';
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

    render(): JSX.Element {
        return (
            <Link
                style={this.STYLES.p}
                to={`/${this.props.path}`}
            >
                {this.props.children}
            </Link>
        );
    }
}
