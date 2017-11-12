import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, colors } from '../data';

interface IProps {
    height?: number
    underlineColor?: string
}

interface IState {
    isHovered: boolean
}

@observer
export class UnderlineSwitch extends React.Component<IProps, IState> {

    STYLES: IInlineStyles = {
        p: {
            id: "underline switch",
            position: "relative"
        },
        underline: {
            height: this.props.height || 1,
            position: "absolute",
            bottom: 0,
            background: this.props.underlineColor || colors.wht,
            transition: "400ms width"
        }
    };

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        };
    }

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
