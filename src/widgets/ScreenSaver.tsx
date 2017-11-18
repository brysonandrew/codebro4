import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { colors, IInlineStyles, prefixer, setBodyStyle, Store, GrowingCircleLoader } from '../data';
import { TextLogo, TypingTextInterval } from '.';
const ANIMATION_DELAY = 2000;
const FONT_SIZE = 24;

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
            background: colors.wht,
            transition: "opacity 1600ms",
            zIndex: 20
        }),
        center: prefixer({
            position: "absolute",
            top: "50%",
            left: "50%",
            fontSize: FONT_SIZE,
            transform: "translate(-50%, -50%)",
        })
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
        const { isIntroMounted, isIntroEnded } = this.props.store;

        return (
            isMounted
                ?   <div
                        style={{
                            ...this.STYLES.p,
                            opacity: isShown ? 1 : 0
                        }}
                        onTransitionEnd={this.handleTransitionEnd}
                    >
                        <div style={{...this.STYLES.center, lineHeight: FONT_SIZE * 2}}>
                            {isIntroMounted
                                ?   <TypingTextInterval
                                        textContent="Hi, my name is Andrew and I make websites"
                                        onAnimationEnd={() => this.props.store.onIntroEnd(true)}
                                    />
                                :   null}
                            {isIntroEnded
                                ?   <GrowingCircleLoader size={FONT_SIZE * 2}/>
                                :   null}
                        </div>
                    </div>
                :   null
        );
    }
}
