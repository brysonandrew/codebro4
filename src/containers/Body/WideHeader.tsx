import * as React from 'react';
import { browserHistory } from 'react-router';
import { observer, inject } from 'mobx-react';
import { IInlineStyles, colors, prefixer } from '../../data';
import { WideHeaderItem } from '.';
import { HomeStore } from '../../mobx';
import { PAGES } from './Pages';

const TEXT_HEIGHT = 38;
const DEFAULT_TAB_WIDTH = 24;

interface IProps {
    store?: HomeStore
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
        line: {
            position: "absolute",
            bottom: 0,
            height: 1,
            background: colors.blk
        },
        underline: {
            position: "absolute",
            left: 0,
            bottom: -3,
            height: 6,
            background: colors.blk,
            transition: "transform 200ms"
        }
    };

// line style

    private lineStyle = () => ({
        ...this.STYLES.line,
        width: this.props.store.docScroll / this.props.store.pagesLength,
        left: this.props.store.width / this.props.store.pagesLength * 0.5
    });

// underline style

    private underlineScale = (): number =>
        Math.abs(
            Math.cos(
                (Math.PI * this.props.store.pagesLength)
                * (this.props.store.docScroll / this.props.store.width / this.props.store.pagesLength)
            )
        );

    private underlineStyle = () => {
        const { tabDimensions, currentIndex } = this.props.store;
        if (tabDimensions[currentIndex]) {
            console.log(tabDimensions[currentIndex].width)

        }

        return prefixer({
            ...this.STYLES.underline,
            width: tabDimensions[currentIndex] ? tabDimensions[currentIndex].width : DEFAULT_TAB_WIDTH,
            transform: `translate3d(${tabDimensions[currentIndex] ? tabDimensions[currentIndex].xOffset : 0}px, 0, 0) scale(${this.underlineScale()})`,
        })
    };

    handleClick = (path: string, index: number) => {
        this.props.store.onCurrentIndexChange(index);
        browserHistory.push(`/${path}`);
        this.props.store.onAnimationStart();
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.p}>
                {!this.props.store.isResizing
                    ?   PAGES.map((page, i) =>
                            <div
                                key={`page-${i}`}
                                style={{...this.STYLES.item, width: `${100 / PAGES.length}%`}}
                                onClick={() => this.handleClick(page.path, i)}
                            >
                                <WideHeaderItem
                                    index={i}
                                    page={page}
                                />
                            </div>)
                    :   null}
                <div style={this.lineStyle()}/>
                <div style={this.underlineStyle()}/>
            </div>
        );
    }
}
