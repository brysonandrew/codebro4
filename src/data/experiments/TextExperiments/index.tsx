import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, colors } from '../..';
import { TypingTextSVG } from "./TypingTextSVG";
import { WrapTextSVG } from './WrapTextSVG';
import { UnderlineSwitch } from '../../../widgets';

const TEXT_EXPERIMENTS = [
    {
        name: "Typing Text",
        component: <TypingTextSVG
            animationConfig={{
                dur: "2000ms",
                begin: "0",
                repeatCount: "infinite"
            }}
            width={1000}
            height={50}
            textContent='I am the Knight Industries Three Thousand. You may call me "K.I.T.T."'
        />
    },
    {
        name: "Text Wrap",
        component: <WrapTextSVG
            animationConfig={{
                dur: "2000ms",
                begin: "0",
                repeatCount: "infinite"
            }}
            width={1000}
            height={50}
            textContent='I am the Knight Industries Three Thousand. You may call me "K.I.T.T."'
        />
    },
];

interface IProps {}

interface IState {
    activeIndex: number
}

@observer
export class TextExperiments extends React.Component<IProps, IState> {

    STYLES: IInlineStyles = {
        p: {
            id: "text experiments",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: colors.blk
        },
        menu: {
            position: "absolute",
            minWidth: 180,
            textAlign: "center",
            top: 0,
            left: 0
        },
        menuItem: {
            cursor: "pointer"
        },
        experiment: {
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 1000,
            height: 50,
            transform: "translate(-50%, -50%)"
        }
    };

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            activeIndex: 0
        };
    }

    private handleMenuClick(i: number) {
        this.setState({
            activeIndex: i
        })
    };

    render(): JSX.Element {
        return  <div style={this.STYLES.p}>
                    <div style={this.STYLES.menu}>
                        {TEXT_EXPERIMENTS.map((experiment, i) =>
                            <div
                                key={`loader-${i}`}
                                style={this.STYLES.menuItem}
                                onClick={() => this.handleMenuClick(i)}
                            >
                                <UnderlineSwitch>
                                    {experiment.name}
                                </UnderlineSwitch>
                            </div>)}
                    </div>
                        <div style={this.STYLES.experiment}>
                            {TEXT_EXPERIMENTS[this.state.activeIndex].component}
                        </div>
                </div>
    }
}
