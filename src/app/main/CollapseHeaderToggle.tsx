import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';
import { IInlineStyles, Segment, Store, colors, prefixer } from "../../data";

const STYLES: IInlineStyles = {
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
        fill: "transparent",
        transition: "stroke-width 1000ms"
    }
};

interface IProps {
    store?: Store
}

@inject('store')
@observer
export class CollapseHeaderToggle extends React.Component<IProps, {}> {

    mountTimeoutId;

    componentDidMount() {
        const pathA = document.getElementById('pathA');
        const pathC = document.getElementById('pathC');
        const pathB = document.getElementById('pathB');
        this.props.store.addMenuToggleSegments(
            new Segment(pathA, 8, 32),
            new Segment(pathB, 8, 32),
            new Segment(pathC, 8, 32)
        );
    }

    componentWillUnmount() {
        clearTimeout(this.mountTimeoutId);
    }

    private handleClick = () => {
        if (this.props.store.isToggleMenuMounted) {
            this.props.store.onCollapseMenuToggle(
                !this.props.store.isCollapseMenuOpen
            )
        }
    };

    render(): JSX.Element {
        const { isCollapseMenuOpen, isToggleMenuMounted } = this.props.store;

        const lineStyle = {...STYLES.line, strokeWidth: isToggleMenuMounted ? 6 : 2, stroke: isCollapseMenuOpen ? colors.wht : colors.blk};
        return (
            <div style={STYLES.p}>
                <svg style={STYLES.icon}>
                    <path style={lineStyle} id="pathA" d="M 30 40 L 70 40 C 90 40 90 75 60 85 A 40 40 0 0 1 20 20 L 80 80"/>
                    <path style={lineStyle} id="pathB" d="M 30 50 L 70 50"/>
                    <path style={lineStyle} id="pathC" d="M 70 60 L 30 60 C 10 60 10 20 40 15 A 40 38 0 1 1 20 80 L 80 20"/>
                </svg>
                <button style={STYLES.trigger} onClick={this.handleClick}/>
            </div>
        );
    }
}
