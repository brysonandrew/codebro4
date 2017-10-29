import * as React from 'react';
import * as Immutable from 'immutable';
import { observer } from 'mobx-react';
import { colors, createArrayOf } from '../data';
import { glitchFilter } from './GlitchText';

enum EAnimationPhase {
    Init,
    StrokeDraw,
    FillDraw
}

const paths = {
    c: "M140.399,439.166c3.35,0 7.072,-0.52 11.166,-1.56l1.34,5.4c-4.764,1.36 -9.081,2.04 -12.952,2.04c-3.871,0 -7.668,-0.64 -11.39,-1.92c-7.742,-2.72 -11.613,-9.72 -11.613,-21l0,-15.36c0,-5.68 1.043,-10.44 3.127,-14.28c3.573,-6.64 9.454,-9.96 17.642,-9.96c4.914,0 9.901,1.28 14.963,3.84l-1.787,4.92c-4.243,-1.76 -7.909,-2.64 -10.998,-2.64c-3.089,0 -5.825,0.4 -8.207,1.2c-2.382,0.8 -4.392,2.6 -6.03,5.4c-1.638,2.8 -2.457,6.4 -2.457,10.8l0,17.4c0,10.48 5.732,15.72 17.196,15.72Z",
    o: "M206.056,405.806l0,15.84c0,6.72 -1.712,12.28 -5.136,16.68c-3.425,4.4 -8.598,6.6 -15.521,6.6c-6.923,0 -12.153,-2.22 -15.689,-6.66c-3.536,-4.44 -5.304,-9.98 -5.304,-16.62l0,-15.84c0,-7.6 1.806,-13.42 5.416,-17.46c3.61,-4.04 8.728,-6.06 15.353,-6.06c6.626,0 11.762,2.1 15.41,6.3c3.647,4.2 5.471,9.94 5.471,17.22Zm-6.253,17.04l0,-17.04c0,-11.6 -4.801,-17.4 -14.404,-17.4c-9.826,0 -14.74,5.8 -14.74,17.4l0,17.04c0,4.8 1.322,8.68 3.964,11.64c2.643,2.96 6.253,4.44 10.832,4.44c4.578,0 8.114,-1.46 10.607,-4.38c2.494,-2.92 3.741,-6.82 3.741,-11.7Z",
    d: "M238.661,382.646c6.179,0 11.092,1.4 14.739,4.2l0,-27.12l6.253,0l0,84c-6.402,0.96 -12.32,1.44 -17.754,1.44c-5.434,0 -10.347,-1.2 -14.739,-3.6c-5.806,-3.2 -8.71,-8.76 -8.71,-16.68l0,-22.68c0,-8.4 3.164,-14.16 9.492,-17.28c3.052,-1.52 6.625,-2.28 10.719,-2.28Zm14.739,10.08c-4.541,-2.72 -9.491,-4.08 -14.851,-4.08c-4.689,0 -8.188,1.28 -10.496,3.84c-2.307,2.56 -3.461,5.92 -3.461,10.08l0,22.44c0,9.36 5.843,14.04 17.531,14.04c3.349,0 7.109,-0.36 11.277,-1.08l0,-45.24Z",
    e: "M285.894,439.286c5.136,0 10.57,-1.64 16.302,-4.92l2.457,5.16c-5.732,3.76 -11.725,5.64 -17.978,5.64c-12.952,0 -19.429,-5.84 -19.429,-17.52l0,-24.6c0,-6.48 1.88,-11.52 5.639,-15.12c3.759,-3.6 8.728,-5.4 14.907,-5.4c6.179,0 10.999,1.78 14.46,5.34c3.462,3.56 5.192,8.5 5.192,14.82l0,15.6l-33.945,2.04l0,7.32c0,4.32 1.452,7.44 4.355,9.36c2.233,1.52 4.913,2.28 8.04,2.28Zm15.297,-27l0,-10.44c0,-3.44 -0.856,-6.26 -2.568,-8.46c-1.712,-2.2 -3.499,-3.6 -5.36,-4.2c-1.861,-0.6 -3.722,-0.9 -5.583,-0.9c-4.094,0 -7.481,1.2 -10.161,3.6c-2.68,2.4 -4.02,6.16 -4.02,11.28l0,10.56l27.692,-1.44Z",
    b: "M357.803,386.846c3.648,-2.8 8.561,-4.2 14.74,-4.2c4.094,0 7.667,0.76 10.719,2.28c6.328,3.12 9.491,8.88 9.491,17.28l0,22.68c0,7.92 -2.903,13.48 -8.709,16.68c-4.392,2.4 -9.305,3.6 -14.739,3.6c-5.435,0 -11.353,-0.48 -17.755,-1.44l0,-84l6.253,0l0,27.12Zm0,5.88l0,45.24c4.169,0.72 7.928,1.08 11.278,1.08c11.687,0 17.531,-4.68 17.531,-14.04l0,-22.44c0,-4.16 -1.042,-7.4 -3.127,-9.72c-2.531,-2.8 -6.308,-4.2 -11.333,-4.2c-5.025,0 -9.808,1.36 -14.349,4.08Z",
    r: "M429.49,389.726c-2.829,-0.8 -5.695,-1.2 -8.598,-1.2c-2.903,0 -5.527,0.7 -7.872,2.1c-2.345,1.4 -3.517,3.42 -3.517,6.06l0,47.04l-6.254,0l0,-60.12l6.254,0l-0.335,4.2c3.498,-3.44 8.114,-5.16 13.845,-5.16c2.531,0 5.249,0.32 8.152,0.96l-1.675,6.12Z",
    o2: "M478.621,405.806l0,15.84c0,6.72 -1.712,12.28 -5.137,16.68c-3.424,4.4 -8.598,6.6 -15.521,6.6c-6.923,0 -12.152,-2.22 -15.688,-6.66c-3.536,-4.44 -5.304,-9.98 -5.304,-16.62l0,-15.84c0,-7.6 1.805,-13.42 5.416,-17.46c3.61,-4.04 8.728,-6.06 15.353,-6.06c6.625,0 11.762,2.1 15.409,6.3c3.648,4.2 5.472,9.94 5.472,17.22Zm-6.253,17.04l0,-17.04c0,-11.6 -4.802,-17.4 -14.405,-17.4c-9.826,0 -14.739,5.8 -14.739,17.4l0,17.04c0,4.8 1.321,8.68 3.964,11.64c2.643,2.96 6.253,4.44 10.831,4.44c4.578,0 8.114,-1.46 10.608,-4.38c2.494,-2.92 3.741,-6.82 3.741,-11.7Z",
};

interface IState {
    animationPhase: EAnimationPhase
    pathLengths: number[]
}

@observer
export class TextLogo extends React.Component<{}, IState> {

    animationInterval;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            animationPhase: EAnimationPhase.Init,
            pathLengths: createArrayOf(0, Object.keys(paths).length)
        };
    }

    componentDidMount() {
        this.setState({
            pathLengths: Immutable.List(this.state.pathLengths).map((pathLength, i) =>
                document.querySelector(`.path-${i}`)["getTotalLength"]()).toArray()
        });
        this.animationInterval = setInterval(() => {
            if (this.state.animationPhase < EAnimationPhase.FillDraw) {
                this.setState({
                    animationPhase: this.state.animationPhase + 1
                });
            } else {
                clearInterval(this.animationInterval);
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.animationInterval);
    }

    render(): JSX.Element {
        const { animationPhase } = this.state;

        return (
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 596 842"
                xmlSpace="preserve"
                style={{
                    visibility: animationPhase > EAnimationPhase.Init ? "visible" : "hidden",
                }}>
                <defs>
                    {glitchFilter({
                        backgroundColor: colors.wht
                    })}
                </defs>
                <g>
                {Object.keys(paths).map((key, i) =>
                    <path
                        key={`path-${i}`}
                        className={`path-${i}`}
                        d={paths[key]}
                        fill={animationPhase > EAnimationPhase.StrokeDraw ? colors.blk : "none"}
                        stroke={animationPhase > EAnimationPhase.Init ? colors.blk : "none"}
                        strokeWidth="4"
                        strokeDasharray={animationPhase > EAnimationPhase.Init ?  this.state.pathLengths[i] : "none"}
                        strokeDashoffset={animationPhase > EAnimationPhase.Init ? 0 : -this.state.pathLengths[i]}
                        style={{
                            filter: animationPhase > EAnimationPhase.StrokeDraw ? "url(#filter)" : "none",
                            transition: "2000ms stroke-dashoffset"
                        }}
                    />)}
                </g>
            </svg>
        );
    }
}
