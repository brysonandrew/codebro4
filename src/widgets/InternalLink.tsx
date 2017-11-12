import * as React from 'react';
import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import { colors } from '../data';

interface IProps {
    path: string
    isNewPage?: boolean
}

@observer
export class InternalLink extends React.Component<IProps, {}> {

    STYLES = {
        p: {
            display: "inline-block",
            cursor: "pointer",
            padding: 10,
            textDecoration: "none",
            color: colors.wht,
            maxWidth: 320
        }
    };

    handleClick() {
        browserHistory.push(`/${this.props.path}`);
    }

    render(): JSX.Element {
        return (
            this.props.isNewPage
                ?   <a
                        style={this.STYLES.p}
                        href={this.props.path}
                        target="_blank"
                    >
                        {this.props.children}
                    </a>
                :   <div
                        style={this.STYLES.p}
                        onClick={() => this.handleClick()}
                    >
                        {this.props.children}
                    </div>
        );
    }
}
