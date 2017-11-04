import * as React from 'react';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import { IPage, IInlineStyles, colors, Store, breakPointTests } from '../../data';

const FONT_SIZE = 14;

export interface ITabData {
    width: number
    xOffset: number
}

interface IProps {
    index: number
    page: IPage
    store?: Store
}

@inject('store')
@observer
export class WideHeaderItem extends React.Component<IProps, {}> {

    @computed public get isActive(): boolean {
        return this.props.store.currentIndex === this.props.index || this.props.store.hoverMenuIndex === this.props.index
    }

    STYLES: IInlineStyles = {
        p: {
            id: "wide header item",
            position: "absolute",
            top: 7,
            left: "50%",
            color: colors.blk,
            fontSize: FONT_SIZE,
            transition: "transform ease 800ms"
        },
        lineCross: {
            position: "absolute",
            top: 0,
            left: 0,
            transition: "transform 400ms",
            transitionDelay: "400ms"
        },
        arm1: {
            position: "absolute",
            top: FONT_SIZE * 0.5,
            left: 0,
            background: colors.blk,
            height: FONT_SIZE,
            width: 1,
            transition: "transform 400ms"
        },
        arm2: {
            position: "absolute",
            top: FONT_SIZE * 0.5,
            left: 0,
            background: colors.blk,
            height: FONT_SIZE,
            width: 1,
            transition: "transform 400ms"
        }
    };
    transitionDelay: "400ms"

    componentDidMount() {
        this.props.store.onWideHeaderItemMount(true);
    }

    renderLineCross = () =>
        <div style={{...this.STYLES.lineCross, transform: `rotate(${this.isActive ? -45 : 0}deg) translateX(${this.isActive ? -FONT_SIZE : 0}px)`}}>
            <div style={{...this.STYLES.arm1, transform: `rotate(${this.isActive ? 45 : 0}deg)`}}/>
            <div style={{...this.STYLES.arm2, transform: `rotate(${this.isActive ? -45 : 0}deg)`}}/>
        </div>;

    render(): JSX.Element {
        const { onMeasureTabByRef, width } = this.props.store;
        const { index, page } = this.props;

        return (
            <div
                key={page.name}
                style={{...this.STYLES.p, transform: `translate3d(0, ${this.isActive ? 0 : 4}px, 0)`}}
                ref={(el) => onMeasureTabByRef(el, index)}
            >
                {breakPointTests.isTablet(width) ? this.renderLineCross() : page.name}
            </div>

        );
    }
}
