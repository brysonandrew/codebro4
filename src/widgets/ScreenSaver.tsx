import * as React from 'react';
import { colors, IInlineStyles, prefixer } from '../data';
import { TextLogo } from '.';
import { setBodyStyle } from '../data/helpers/set-body-style';
import { GrowingCircleLoader } from '../data/experiments/Loaders/GrowingCircleLoader';

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
    mountTimeoutId;

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
            left: "50%",
            transform: "translate(-50%, -50%)",
        })
    };

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            isShown: true
        };
    }

    componentDidMount() {
        this.mountTimeoutId = setTimeout(() => {
            this.setState({
                isMounted: true
            });
        }, 0);
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
        });
        if (!this.state.isShown) {
            setBodyStyle('position', 'static');
        }
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
                            <GrowingCircleLoader
                                size={400}
                            />
                        </div>
                    </div>
                :   null
        );
    }
}
