import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, colors } from '../..';

interface IProps {
    hamburger: JSX.Element
    index: number
}

interface IState {
    isZoomed: boolean
    isOpen: boolean
}

@observer
export class HamburgerControls extends React.Component<IProps, IState> {

    STYLES: IInlineStyles = {
        p: {
            display: "inline-block",
            background: colors.blk,
            top: 0,
            left: 0,
            width: 160,
            height: 160,
            transition: "transform 200ms",
            cursor: "pointer"
        },
        number: {
            position: "absolute",
            top: 20,
            right: 20,
            color: colors.wht
        },
        content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)"
        }
    };

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isZoomed: false,
            isOpen: false
        }
    }

    componentDidMount() {
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.type = 'text/css';
        link.href = `/images/hamburgers/${this.props.index}.css`;
        document.head.appendChild(link);
    }

    handleClickBorder = () => {
        this.setState({
            isZoomed: !this.state.isZoomed
        });
    };

    handleClickNav = (e) => {
        this.setState({
            isOpen: !this.state.isOpen
        });
        e.stopPropagation();
    };

    render(): JSX.Element {
        return (
            <div
                style={{
                    ...this.STYLES.p,
                    position: this.state.isZoomed ? "absolute" : "static",
                    top: this.state.isZoomed ? "50%" : 0,
                    left: this.state.isZoomed ? "50%" : 0,
                    zIndex: this.state.isZoomed ? 2 : 0,
                    transform: `scale(${this.state.isZoomed ? 4 : 1}) translate(${this.state.isZoomed ? -50 : 0}%, ${this.state.isZoomed ? -50 : 0}%)`}}
                onClick={this.handleClickBorder}
            >
                <h4 style={this.STYLES.number}>{this.props.index + 1}</h4>
                <div
                    className={`nav-bar-toggle ${this.state.isOpen ? "-active" : ""}`}
                    style={this.STYLES.content}
                    onClick={this.handleClickNav}
                >
                    {this.props.hamburger}
                </div>
            </div>
        );
    }
}
