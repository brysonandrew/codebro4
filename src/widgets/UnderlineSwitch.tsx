import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, colors } from '../data';

interface IProps {
    height: number
    underlineColor: string
}

interface IState {
    isHovered: boolean
}

@observer
export class UnderlineSwitch extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        };
    }

    STYLES: IInlineStyles = {
        p: {
            id: "underline switch",
            position: "relative",
            padding: "4px 0"
        },
        underline: {
            height: this.props.height,
            position: "absolute",
            bottom: 0,
            background: colors.blk,
            transition: "400ms width"
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
                style={this.STYLES.p}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                {this.props.children}
                <div style={{
                    ...this.STYLES.underline,
                    [this.state.isHovered ? "left" : "right"]: 0,
                    width: `${this.state.isHovered ? 100 : 0}%`
                }}/>
            </div>
        );
    }
}
