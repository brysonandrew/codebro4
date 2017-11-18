import * as React from 'react';
import * as Immutable from 'immutable';
import { observer } from 'mobx-react';
import { interval } from '../data';

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

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            textShown: []
        };
    }

    componentDidMount() {
        let textArray: string[] = this.props.textContent.split("");
        let count = 0;
        interval(100, this.props.textContent.length, () => {
            this.setState({
                textShown: Immutable.List(this.state.textShown).push(textArray[count]).toArray()
            });
            count++;
        }, (intervalId => (this.intervalId = intervalId)), this.props.onAnimationEnd);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render(): JSX.Element {
        return  <span>
                    {this.state.textShown.map((letter, i) =>
                        <span key={`letter-${i}`}>
                            {letter}
                        </span>)}
                </span>

    }
}
