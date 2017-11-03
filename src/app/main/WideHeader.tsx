import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';
import { IInlineStyles, colors, prefixer, Store, IEVersion, MAIN_PAGES } from '../../data';
import { WideHeaderItem } from '.';
import { ITabData } from './WideHeaderItem';

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
            height: 28,
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
            background: colors.faint,
            transformOrigin: "50% 50%"
        }),
        underline: prefixer({
            position: "absolute",
            bottom: 0,
            height: 2,
            background: colors.blk,
            transformOrigin: "50% 50%",
            transition: "width 2000ms, transform 2000ms"
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
            : `translate3d(${tabDimension ? tabDimension.xOffset : 0}px, 0, 0)`}`
    };

    @computed public get underlineStyle() {
        const { tabDimensions, currentIndex } = this.props.store;
        return prefixer({
            ...this.STYLES.underline,
            width: tabDimensions[currentIndex] ? tabDimensions[currentIndex].width : DEFAULT_TAB_WIDTH,
            transform: this.underlineTransform(tabDimensions[currentIndex]),
        })
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.p}>
                {!this.props.store.isResizing
                    ?   MAIN_PAGES.map((page, i) =>
                            <div
                                key={`page-${i}`}
                                style={{...this.STYLES.item, width: `${100 / MAIN_PAGES.length}%`}}
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
