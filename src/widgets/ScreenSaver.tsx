import * as React from 'react';
import {colors, IInlineStyles} from '../data';

interface IProps {
    isScreenSaver: boolean
}

interface IState {
    isMounted: boolean
    isShown: boolean
}

export class ScreenSaver extends React.Component<IProps, IState> {

    openTimeoutId;
    STYLES: IInlineStyles = {
        screenSaver: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            color: colors.blk,
            background: colors.wht,
            transition: "opacity 800ms",
            zIndex: 20
        },
        screenSaver__text: {
            position: "absolute",
            top: "50%",
            left: "50%",
            fontSize: 28,
            transform: "translate(-50%, -50%)"
        }
    };

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: true,
            isShown: true
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isScreenSaver !== this.props.isScreenSaver) {
            this.setState({
                isMounted: true
            });
            this.openTimeoutId = setTimeout(
                () =>
                    this.setState({
                        isShown: nextProps.isScreenSaver
                    }
                ), 100);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.openTimeoutId);
    }

    handleTransitionEnd = () => {
        this.setState({
            isMounted: this.state.isShown
        })
    };

    render(): JSX.Element {
        const { isMounted, isShown } = this.state;

        return (
            isMounted
                ?   <div
                        style={{...this.STYLES.screenSaver, opacity: isShown ? 1 : 0}}
                        onTransitionEnd={this.handleTransitionEnd}
                    >
                        <div style={this.STYLES.screenSaver__text}>
                            code bro
                        </div>
                    </div>
                :   null
        );
    }
}
