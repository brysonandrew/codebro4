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
            position: "relative",
            background: colors.wht
        },
        sample: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: colors.blk,
            width: 320,
            height: 320,
            transition: "transform 200ms",
            cursor: "pointer"
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
            <div style={this.STYLES.p}>
                <h4 style={{float: "right"}}>{this.props.index}</h4>
                <div
                    style={{...this.STYLES.sample, transform: `scale(${this.state.isZoomed ? 4 : 1})`}}
                    onClick={this.handleClickBorder}
                >
                    <div
                        className={`pt-nav-bar-toggle ${this.state.isOpen ? "-pt-active" : ""}`}
                        onClick={this.handleClickNav}
                    >
                       {this.props.hamburger}
                    </div>
                </div>
            </div>
        );
    }
}
