import * as React from 'react';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import { IPage, IInlineStyles, colors, Store, breakPointTests } from '../../data';

const CROSS_SIZE = 15;
const THICKNESS = 1;
const TRANSITION_DURATION = 200;

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
            fontSize: CROSS_SIZE,
            transition: "transform ease 800ms"
        },
        lineCross: {
            position: "absolute",
            top: 0,
            left: 0
        },
        armY: {
            position: "absolute",
            top: 0,
            left: 0,
            background: colors.blk,
            height: CROSS_SIZE,
            width: THICKNESS
        },
        armX: {
            position: "absolute",
            top: 0,
            left: 0,
            background: colors.blk,
            height: CROSS_SIZE,
            width: THICKNESS,
            transition: `transform ${TRANSITION_DURATION}ms`
        }
    };

    componentDidMount() {
        this.props.store.onWideHeaderItemMount(true);
    }

    renderLineCross = () =>
        <div style={this.STYLES.lineCross}>
            <div style={this.STYLES.armY}/>
            <div style={{...this.STYLES.armX, transform: `rotate(${this.isActive ? 90 : 0}deg)`}}/>
        </div>;

    render(): JSX.Element {
        const { onMeasureTabByRef, width } = this.props.store;
        const { index, page } = this.props;

        return (
            <div
                key={page.name}
                style={{...this.STYLES.p, transform: `translate3d(0, ${this.isActive ? -4 : 0}px, 0)`}}
                ref={(el) => onMeasureTabByRef(el, index)}
            >
                {breakPointTests.isTablet(width) ? this.renderLineCross() : page.name}
            </div>

        );
    }
}
