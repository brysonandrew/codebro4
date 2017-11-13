import * as React from 'react';
import { colors, IInlineStyles, prefixer } from '../data';
import { TextLogo } from '.';
import { GrowingStripeLoader } from './GrowingStripeLoader';

interface IProps {
    isScreenSaver: boolean
    wakeUpDuration: number
}

interface IState {
    isMounted: boolean
    isShown: boolean
}

export class ScreenSaver extends React.Component<IProps, IState> {

    openTimeoutId;
    STYLES: IInlineStyles = {
        p: prefixer({
            id: "screen saver",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: colors.wht,
            transition: "opacity 1600ms",
            zIndex: 20
        }),
        center: prefixer({
            position: "absolute",
            top: "50%",
            right: "50%",
            transform: "translate(50%, -50%)",
        })
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
                ), nextProps.isScreenSaver ? 400 : this.props.wakeUpDuration);
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
                        style={{
                            ...this.STYLES.p,
                            opacity: isShown ? 1 : 0
                        }}
                        onTransitionEnd={this.handleTransitionEnd}
                    >
                        <div style={this.STYLES.center}>
                            <GrowingStripeLoader/>
                        </div>
                    </div>
                :   null
        );
    }
}
