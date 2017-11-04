import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, colors, prefixer } from "../..";
import { inAC, inB, outAC, outB, Segment } from "../helpers";

const PATHS = [
    "M 30 40 L 70 40 C 90 40 90 75 60 85 A 40 40 0 0 1 20 20 L 80 80",
    "M 30 50 L 70 50",
    "M 70 60 L 30 60 C 10 60 10 20 40 15 A 40 38 0 1 1 20 80 L 80 20"
];

const CLOSE_FUNCTIONS = [
    inAC,
    inB,
    inAC
];

const OPEN_FUNCTIONS = [
    outAC,
    outB,
    outAC
];

interface IState {
    isOpen?: boolean
    isMounted?: boolean
}

@observer
export class SVGBurger extends React.Component<{}, IState> {

    STYLES: IInlineStyles = {
        p: prefixer({
            id: 'collapse header toggle',
            position: 'absolute',
            top: '50%',
            left: '50%',
            display: 'inline-block',
            width: 34,
            height: 34,
            transition: 'all 200ms',
            transform: 'translate(-50%, -50%)',
            zIndex: 10
        }),
        trigger: {
            position: "relative",
            width: "100%",
            height: "100%",
            cursor: "pointer",
            pointerEvents: "auto",
            background: "none",
            border: "none",
            outline: "none",
            margin: 0,
            padding: 0
        },
        icon: {
            position: 'absolute',
            width: 100,
            height: 100,
            top: -33,
            left: -33,
        },
        line: {
            strokeLinecap: "square",
            stroke: colors.wht,
            fill: "transparent",
            transition: "stroke-width 1000ms"
        }
    };

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isOpen: false,
            isMounted: false
        }
    }

    mountTimeoutId;
    paths = [];
    segments = [];

    componentDidMount() {
        this.setState({
            isMounted: true
        });
        this.segments = this.paths.map(path =>  new Segment(path, 8, 32));
    }

    componentWillUnmount() {
        clearTimeout(this.mountTimeoutId);
    }

    private handleClick = () => {
        if (this.state.isMounted) {
            if (this.state.isOpen) {
                OPEN_FUNCTIONS.map((f, i) => {
                    f(this.segments[i]);
                });
            } else {
                CLOSE_FUNCTIONS.map((f, i) => {
                    f(this.segments[i]);
                });
            }
        }
        this.setState({
            isOpen: !this.state.isOpen
        })
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.p}>
                <svg style={this.STYLES.icon}>
                    {PATHS.map((path, i) =>
                        <path
                            key={`path-${i}`}
                            style={{...this.STYLES.line, strokeWidth: this.state.isMounted ? 6 : 0 }}
                            ref={(el) => el && (this.paths[i] = el)}
                            d={path}
                        />)}
                </svg>
                <button style={this.STYLES.trigger} onClick={this.handleClick}/>
            </div>
        );
    }
}
