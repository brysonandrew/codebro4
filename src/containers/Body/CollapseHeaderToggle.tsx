import * as React from 'react';
import { observer, inject } from 'mobx-react';
const Segment = require("segment-js");
import { IInlineStyles } from '../../data';
import { HomeStore } from '../../mobx/HomeStore';

const STYLES: IInlineStyles = {
    p: {
        id: 'collapse header toggle',
        position: 'absolute',
        top: '50%',
        left: '50%',
        display: 'inline-block',
        width: 34,
        height: 34,
        transition: 'all 200ms',
        transform: 'translate(-50%, -50%)'
    },
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
        top: -33,
        left: -33,
    },
    line: {
        stroke: '#000000',
        strokeWidth: 6,
        strokeLinecap: 'square',
        fill: 'transparent'
    }
};

interface IProps {
    store?: HomeStore<string>
}

@inject('store')
@observer
export class CollapseHeaderToggle extends React.Component<IProps, {}> {

    isLoaded = false;
    segmentA;
    segmentB;
    segmentC;

    componentDidMount() {
        this.isLoaded = true;
        const pathA = document.getElementById('pathA');
        const pathC = document.getElementById('pathC');
        const pathB = document.getElementById('pathB');
        this.segmentA = new Segment(pathA, 8, 32);
        this.segmentB = new Segment(pathB, 8, 32);
        this.segmentC = new Segment(pathC, 8, 32);
    }

    private handleClick = () => {
        if (this.isLoaded) {
            this.props.store.onCollapseMenuToggle(
                !this.props.store.isCollapseMenu,
                this.segmentA,
                this.segmentB,
                this.segmentC
            )
        }
    };

    render(): JSX.Element {
        return (
            <div style={STYLES.p}>
                <div style={STYLES.p}>
                    <svg style={STYLES.icon} width="100px" height="100px">
                        <path style={STYLES.line} id="pathA" d="M 30 40 L 70 40 C 90 40 90 75 60 85 A 40 40 0 0 1 20 20 L 80 80"/>
                        <path style={STYLES.line} id="pathB" d="M 30 50 L 70 50"/>
                        <path style={STYLES.line} id="pathC" d="M 70 60 L 30 60 C 10 60 10 20 40 15 A 40 38 0 1 1 20 80 L 80 20"/>
                    </svg>
                    <button style={STYLES.trigger} onClick={this.handleClick}/>
                </div>
            </div>
        );
    }
}
