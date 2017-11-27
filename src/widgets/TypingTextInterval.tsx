import * as React from 'react';
import * as Immutable from 'immutable';
import { observer } from 'mobx-react';
import { interval } from '../data';
export const TYPING_SPEED = 60;

interface IProps {
    textContent: string
    onAnimationEnd?: () => void
}

interface IState {
    textShown: string[]
}

@observer
export class TypingTextInterval extends React.Component<IProps, IState> {

    intervalId;

    STYLES = {
        p: {
            display: "inline-block"
        },
        letter: {
            display: "inline-block",
            transition: `opacity ${TYPING_SPEED * 5}ms, transform ${TYPING_SPEED * 5}ms`
        }
    };

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            textShown: []
        };
    }

    componentDidMount() {
        let textArray: string[] = this.props.textContent.split("");
        let count = 0;
        interval(TYPING_SPEED, this.props.textContent.length, () => {
            this.setState({
                textShown: Immutable.List(this.state.textShown).push(textArray[count]).toArray()
            });
            count++;
        }, (intervalId => (this.intervalId = intervalId))
            , () => this.props.onAnimationEnd && this.props.onAnimationEnd());
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    transformStyle = (i: number): string => `rotate(${i === this.state.textShown.length - 1 ? 90 : 0}deg)`;

    opacityStyle = (i: number): number =>
        i === this.state.textShown.length - 1
            ? 0
            : 1;

    render(): JSX.Element {
        return  <div style={this.STYLES.p}>
                    {this.state.textShown.map((letter, i) =>
                        <div
                            key={`letter-${i}`}
                            style={{
                                ...this.STYLES.letter,
                                transform: this.transformStyle(i),
                                opacity: this.opacityStyle(i),
                                width: letter === " " ? 12 : "auto"
                            }}
                        >
                            {letter}
                        </div>)}
                </div>

    }
}
