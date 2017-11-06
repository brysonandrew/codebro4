import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { IInlineStyles, prefixer, Store, colors } from '..';
import { TypingTextInterval } from '../../widgets';

const ANIMATION_DELAY = 2000;

interface IProps {
    store?: Store
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
            fontSize: 26,
            lineHeight: 2,
            minHeight: 100,
            // background: "rgba(255,255,255, 0.88)",
            width: "50%",
            minWidth: 280
        }
    };

    componentDidMount() {
        setTimeout(() => this.props.store.onIntroMount(true), (this.props.store.wakeUpDuration + ANIMATION_DELAY) / 2);
    }

    componentWillUnmount() {
        clearTimeout(this.mountTimeoutId)
    }

    render(): JSX.Element {
        const { isIntroMounted, wakeUpDuration } = this.props.store;
        return (
            <div style={this.STYLES.intro}>
                <p style={prefixer({
                    ...this.STYLES.intro__text,
                    transform: `scaleY(${isIntroMounted ? 1 : 0})`,
                    transition: `transform ${wakeUpDuration}ms`})}
                >
                    {isIntroMounted
                        ?   <TypingTextInterval
                                textContent="Hi, my name is Andrew and I make websites."
                            />
                        :   null}
                </p>
            </div>
        );
    }
}
