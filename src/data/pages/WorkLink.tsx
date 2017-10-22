import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, IWork, colors } from '..';

interface IProps {
    work: IWork
}

interface IState {
    isHovered: boolean
}

@observer
export class WorkLink extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        };
    }

    STYLES: IInlineStyles = {
        workLink: {
            id: "work link",
            position: "relative"
        },
        workLink__text: {
            fontSize: 24,
            color: colors.blk,
            textDecoration: "none"
        },
        workLink__underline: {
            height: 4,
            position: "absolute",
            bottom: 0,
            background: colors.blk
        }
    };

    handleMouseEnter = () => {
        this.setState({
            isHovered: true
        })
    };

    handleMouseLeave = () => {
        this.setState({
            isHovered: false
        })
    };

    render(): JSX.Element {
        return (
            <div
                style={this.STYLES.workLink}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <a
                    style={this.STYLES.workLink__text}
                    href={this.props.work.link}
                    target="_blank"
                >
                    {this.props.work.name}
                </a>
                <div style={{
                    ...this.STYLES.workLink__underline,
                    width: `${this.state.isHovered ? 100 : 0}%`
                }}/>
            </div>
        );
    }
}
