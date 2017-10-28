import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { IInlineStyles, prefixer } from '..';
import { TypingText } from '../../widgets/TypingText';
import { HomeStore } from '../../mobx/HomeStore';
import { WAKE_UP_DURATION } from '../../widgets/ScreenSaver';
const ANIMATION_DELAY = 2000;
const ANIMATION_DURATION = 1000;

interface IProps {
    store?: HomeStore
}

@inject('store')
@observer
export class Intro extends React.Component<IProps, {}> {

    mountTimeoutId;

    STYLES: IInlineStyles = {
        intro: prefixer({
            id: "intro",
            position: "absolute",
            top: "50%",
            left: "50%",
            textAlign: "center",
            transform: "translate(-50%, -50%) "
        }),
        intro__text: {
            display: "inline-block",
            padding: 20,
            fontFamily: "'Inconsolata', 'arial', sans-serif",
            background: "rgba(255,255,255, 0.88)",
            width: "50%"
        }
    };

    componentDidMount() {
        setTimeout(() => this.props.store.onIntroMount(true), (WAKE_UP_DURATION + ANIMATION_DELAY) / 2);
    }

    componentWillUnmount() {
        clearTimeout(this.mountTimeoutId)
    }

    render(): JSX.Element {
        return (
            <div style={this.STYLES.intro}>
                <p style={{
                    ...this.STYLES.intro__text,
                    transform: `scaleY(${this.props.store.isIntroMounted ? 1 : 0})`,
                    transition: `transform ${WAKE_UP_DURATION}ms`}}>
                    <TypingText
                        animationConfig={{
                            dur: `${ANIMATION_DURATION}ms`,
                            begin: `${ANIMATION_DELAY}ms`,
                            repeatCount: "0"
                        }}
                        textContent="Hi, my name is Andrew"
                    />
                    <TypingText
                        animationConfig={{
                            dur: `${ANIMATION_DURATION}ms`,
                            begin: `${ANIMATION_DELAY + ANIMATION_DURATION}ms`,
                            repeatCount: "0"
                        }}
                        textContent="and I make websites."
                    />
                </p>
            </div>
        );
    }
}
