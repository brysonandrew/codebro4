import * as React from 'react';
import { observer } from 'mobx-react';
import { colors } from '../data';

interface IProps {
    path: string
}

@observer
export class ExternalLink extends React.Component<IProps, {}> {

    STYLES = {
        p: {
            display: "inline-block",
            cursor: "pointer",
            padding: 2,
            textDecoration: "none",
            color: colors.wht,
            maxWidth: 320
        }
    };

    render(): JSX.Element {
        return (
            <a
                style={this.STYLES.p}
                href={this.props.path}
                target="_blank"
            >
                {this.props.children}
            </a>
        );
    }
}
