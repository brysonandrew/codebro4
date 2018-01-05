import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, prefixer, GrowingCircleLoader } from '../data';
import { TypingTextInterval, TYPING_SPEED } from './TypingTextInterval';

const TEXT_CONTENT = "Hi, my name is Andrew and I make websites ";

interface IProps {
    isAwake: boolean
    isMobile: boolean
    isTablet: boolean
    onAwake: (isAwake: boolean) => void
}

interface IState {
    isMounted: boolean
    isVisible: boolean
}

@observer
export class ScreenSaver extends React.Component<IProps, IState> {

    wakeTimeoutId;
    sleepTimeoutId;
    freezeTimeoutId;

    STYLES: IInlineStyles = {
        p: prefixer({
            id: "screen saver",
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            background: "rgba(0,0,0, 0.22)",
            transition: "1000ms opacity",
            zIndex: 20
        }),
        center: prefixer({
            id: "screen saver -- center",
            display: "inline-block",
            padding: "0 10px"
        }),
        loader: {
            id: "screen saver -- loader",
            display: "inline-block",
            transition: `transform ${TEXT_CONTENT.length * TYPING_SPEED}ms`
        }
    };

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: true,
            isVisible: true
        };
    }

    fontSize = () => this.props.isMobile ? 12 : this.props.isTablet ? 20 : 24;

    componentWillReceiveProps(nextProps) {
        if (this.props.isAwake !== nextProps.isAwake) {
            if (nextProps.isAwake && this.state.isVisible) {
                this.wake();
            } else if (!nextProps.isAwake && !this.state.isVisible) {
                this.sleep();
            }
        }
    }

    componentWillUnmount() {
        clearTimeout(this.wakeTimeoutId);
        clearTimeout(this.sleepTimeoutId);
        clearTimeout(this.freezeTimeoutId);
    }

    wake = () => {
        this.setState({
            isMounted: true
        });
        this.wakeTimeoutId = setTimeout(() => {
            this.setState({
                isVisible: false
            })
        }, 0);
        this.freezeTimeoutId = setTimeout(() => {
            this.setState({
                isMounted: false
            });
        }, 1000);
    };

    sleep = () => {
        this.setState({
            isMounted: true,
        });
        this.sleepTimeoutId = setTimeout(() => {
            this.setState({
                isVisible: true
            })
        }, 0);
    };

    render(): JSX.Element {
        const { isMounted, isVisible } = this.state;
        const { onAwake } = this.props;

        return (
            isMounted
                ?   <div
                        style={{
                            ...this.STYLES.p,
                            opacity: isVisible ? 1 : 0,
                            lineHeight: this.fontSize() * 2,
                            fontSize: this.fontSize()

                        }}
                        onClick={() => onAwake(true)}
                        onMouseMove={() => onAwake(true)}
                    >
                        <div style={this.STYLES.center}>
                            <TypingTextInterval
                                textContent={TEXT_CONTENT}
                            />
                            <div
                                style={{
                                    ...this.STYLES.loader,
                                    transform: `scale(${isVisible ? 1 : 0})`
                                }}
                            >
                                <GrowingCircleLoader size={this.fontSize() * 2}/>
                            </div>
                        </div>
                    </div>
                :   null
        );
    }
}
