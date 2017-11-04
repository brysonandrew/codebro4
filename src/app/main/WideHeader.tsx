import * as React from 'react';
import { Motion, spring } from 'react-motion';
import { observer, inject } from 'mobx-react';
import { IInlineStyles, colors, prefixer, Store, IEVersion, MAIN_PAGES } from '../../data';
import {ITabData, WideHeaderItem} from './WideHeaderItem';
import {browserHistory} from 'react-router';

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
            height: 32,
            color: colors.blk
        },
        item: {
            position: "relative",
            display: "inline-block",
            height: 32,
            marginTop: 0,
            width: `${100 / MAIN_PAGES.length}%`,
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
            height: 1,
            background: colors.blk,
            transformOrigin: "50% 50%"
        })
    };

    private lineStyle = () => ({
        ...this.STYLES.line,
        width: this.props.store.docScroll / this.props.store.pagesLength,
        left: this.props.store.width / this.props.store.pagesLength * 0.5
    });

    private underlineTransform = (x): string => {
        return `${IEVersion() <= 11
            ? "none"
            : `translate3d(${x}px, 0, 0)`}`
    };

    private underlineStyle = (isDefault: boolean): ITabData => {
        const { tabDimensions, currentIndex, hoverMenuIndex } = this.props.store;

        if (isDefault) {
            return ({
                width: tabDimensions[currentIndex].width,
                xOffset: tabDimensions[currentIndex].xOffset
            })
        } else {
            return ({
                width: spring(hoverMenuIndex > -1
                    ?   Math.abs(tabDimensions[currentIndex].xOffset - tabDimensions[hoverMenuIndex].xOffset)
                    :   tabDimensions[currentIndex].width),
                xOffset: spring((hoverMenuIndex > -1 && hoverMenuIndex < currentIndex)
                    ?   (tabDimensions[hoverMenuIndex].xOffset + tabDimensions[hoverMenuIndex].width)
                    :   tabDimensions[currentIndex].xOffset)
            })
        }
    };

    handleMouseEnter = (index) => {
        this.props.store.onHoverMenuIndexChange(index);
    };

    handleMouseLeave = () => {
        this.props.store.onHoverMenuIndexChange(-1);
    };

    handleClick = (path: string, index) => {
        browserHistory.push(`/${path}`);
        this.props.store.onCurrentIndexChange(index);
        this.props.store.onHoverMenuIndexChange(-1);
        this.props.store.onAnimationStart();
    };

    render(): JSX.Element {

        return (
            <div style={this.STYLES.p}>
                {!this.props.store.isResizing
                    ?   MAIN_PAGES.map((page, i) =>
                            <div
                                key={`page-${i}`}
                                style={this.STYLES.item}
                                onMouseEnter={() => this.handleMouseEnter(i)}
                                onMouseLeave={() => this.handleMouseLeave()}
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
                    ?   <Motion
                            defaultStyle={this.underlineStyle(true)}
                            style={this.underlineStyle(false)}
                        >
                            {interpolatedStyle =>
                                <div
                                    style={prefixer({
                                        ...this.STYLES.underline,
                                        width: interpolatedStyle.width,
                                        transform: this.underlineTransform(interpolatedStyle.xOffset)
                                    })}
                                />}
                        </Motion>
                    :   null}
            </div>
        );
    }
}
