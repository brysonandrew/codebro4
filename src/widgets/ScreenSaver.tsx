import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { colors, IInlineStyles, prefixer, setBodyStyle, Store, GrowingCircleLoader } from '../data';
import { TypingTextInterval, TYPING_SPEED } from './TypingTextInterval';

const ANIMATION_DELAY = 2000;
const TEXT_CONTENT = "Hi, my name is Andrew and I make websites ";

interface IProps {
    isScreenSaver: boolean
    store?: Store
}

interface IState {
    isMounted: boolean
    isShown: boolean
}

@inject('store')
@observer
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
            background: colors.blk,
            transition: "opacity 1600ms",
            zIndex: 20
        }),
        center: prefixer({
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            textAlign: "center",
            transform: "translate(-50%, -50%)",
        }),
        loader: {
            display: "inline-block",
            transition: `transform ${TEXT_CONTENT.length * TYPING_SPEED}ms`
        }
    };

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: true,
            isShown: true
        };
    }

    componentDidMount() {
        this.mountTimeoutId = setTimeout(() => {
            setTimeout(() => this.props.store.onIntroMount(true), (this.props.store.wakeUpDuration + ANIMATION_DELAY) / 2);
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
                ), nextProps.isScreenSaver ? 400 : this.props.store.wakeUpDuration);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.openTimeoutId);
    }

    fontSize = () => this.props.store.isMobile ? 12 : this.props.store.isTablet ? 20 : 24;

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
        const { isIntroMounted } = this.props.store;

        return (
            isMounted
                ?   <div
                        style={{
                            ...this.STYLES.p,
                            opacity: isShown ? 1 : 0
                        }}
                        onTransitionEnd={this.handleTransitionEnd}
                    >
                        <div style={{...this.STYLES.center, lineHeight: this.fontSize() * 2, fontSize: this.fontSize()}}>
                            <div style={{display: "inline-block"}}>
                                {isIntroMounted
                                    ?   <TypingTextInterval
                                            textContent={TEXT_CONTENT}
                                            onAnimationEnd={() => this.props.store.onIntroEnd(true)}
                                        />
                                    :   null}
                                <div style={{...this.STYLES.loader, transform: `scale(${isIntroMounted ? 1 : 0})`}}>
                                    <GrowingCircleLoader size={this.fontSize() * 2}/>
                                </div>
                            </div>
                        </div>
                    </div>
                :   null
        );
    }
}
