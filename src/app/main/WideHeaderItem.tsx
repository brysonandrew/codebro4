import * as React from 'react';
import { browserHistory } from 'react-router';
import { inject, observer } from 'mobx-react';
import { IPage, IInlineStyles, colors, Store } from '../../data';

const FONT_SIZE = 14;

const STYLES: IInlineStyles = {
    p: {
        position: "absolute",
        bottom: 0,
        paddingBottom: 4,
        left: "50%"
    },
    text: {
        id: "wide header item",
        color: colors.blk,
        fontSize: FONT_SIZE,
        transition: "transform ease 1000ms"
    }
};

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

    prevCurrentIndex = 0;

    componentDidMount() {
        this.props.store.onWideHeaderItemMount(true);
    }

    handleMouseEnter = () => {
        this.prevCurrentIndex = this.props.store.currentIndex;
        this.props.store.onCurrentIndexChange(this.props.index);
    };

    handleMouseLeave = () => {
        this.props.store.onCurrentIndexChange(this.prevCurrentIndex);
    };

    handleClick = (path: string) => {
        browserHistory.push(`/${path}`);
        this.props.store.onCurrentIndexChange(this.props.index);
        this.props.store.onAnimationStart();
        this.prevCurrentIndex = this.props.index;
    };

    render(): JSX.Element {
        const { onMeasureTabByRef } = this.props.store;
        const { index, page } = this.props;

        return (
            <div
                key={page.name}
                style={STYLES.p}
                ref={(el) => onMeasureTabByRef(el, index)}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={() => this.handleClick(page.path)}
            >
                <div
                    style={{...STYLES.text, transform: `translate3d(0, ${this.props.store.currentIndex === this.props.index ? "-4px" : 0}, 0)`}}
                >
                    {page.name}
                </div>
            </div>

        );
    }
}
