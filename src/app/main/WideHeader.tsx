import * as React from 'react';
import { browserHistory } from 'react-router';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';
import { IInlineStyles, colors, prefixer, Store, IEVersion } from '../../data';
import { WideHeaderItem } from '.';
import { ITabData } from './WideHeaderItem';
import {MAIN_PAGES} from '../../data/pages/index';

const TEXT_HEIGHT = 38;
const DEFAULT_TAB_WIDTH = 24;

interface IProps {
    store?: Store
}

@inject('store')
@observer
export class WideHeader extends React.Component<IProps, {}> {

    STYLES: IInlineStyles = {
        p: {
            id: "wide header",
            position: "relative",
            height: TEXT_HEIGHT,
            color: colors.blk
        },
        item: {
            position: "relative",
            display: "inline-block",
            cursor: "pointer"
        },
        line: prefixer({
            position: "absolute",
            bottom: 0,
            height: 1,
            transformOrigin: "50% 50%",
            background: colors.blk
        }),
        underline: prefixer({
            position: "absolute",
            bottom: -3,
            height: 6,
            background: colors.blk,
            transformOrigin: "50% 50%",
            transition: "transform 200ms"
        })
    };

// line style

    private lineStyle = () => ({
        ...this.STYLES.line,
        width: this.props.store.docScroll / this.props.store.pagesLength,
        left: this.props.store.width / this.props.store.pagesLength * 0.5
    });

// underline style

    private underlineTransform = (tabDimension: ITabData): string => {
        return `${IEVersion() <= 11
            ? "none"
            : `translate3d(${tabDimension ? tabDimension.xOffset : 0}px, 0, 0)`} scale(${this.underlineScale})`
    };

    @computed public get underlineScale(): number {
        return  Math.abs(
                    Math.cos(
                        (Math.PI * this.props.store.pagesLength)
                        * (this.props.store.docScroll / this.props.store.width / this.props.store.pagesLength)
                    )
        )
    };

    @computed public get underlineStyle() {
        const { tabDimensions, currentIndex } = this.props.store;
        return prefixer({
            ...this.STYLES.underline,
            width: tabDimensions[currentIndex] ? tabDimensions[currentIndex].width : DEFAULT_TAB_WIDTH,
            transform: this.underlineTransform(tabDimensions[currentIndex]),
        })
    };

    handleClick = (path: string, index: number) => {
        browserHistory.push(`/${path}`);
        this.props.store.onCurrentIndexChange(index);
        this.props.store.onAnimationStart();
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.p}>
                {!this.props.store.isResizing
                    ?   MAIN_PAGES.map((page, i) =>
                            <div
                                key={`page-${i}`}
                                style={{...this.STYLES.item, width: `${100 / MAIN_PAGES.length}%`}}
                                onClick={() => this.handleClick(page.path, i)}
                            >
                                <WideHeaderItem
                                    index={i}
                                    page={page}
                                />
                            </div>)
                    :   null}
                <div style={this.lineStyle()}/>
                {this.props.store.isTabsMeasured
                    ?   <div style={this.underlineStyle}/>
                    :   null}
            </div>
        );
    }
}
