import * as React from 'react';
import { browserHistory } from 'react-router';
import { Motion, spring } from 'react-motion';
import { observer, inject } from 'mobx-react';
import { IInlineStyles, colors, prefixer, Store, IEVersion, MAIN_PAGES } from '../../data';
import { ITabData, WideHeaderItem } from './WideHeaderItem';

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
            height: 32
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

    pagesLength = this.props.store.pagesLength;

    private lineStyle = () => ({
        ...this.STYLES.line,
        ...this.fullLineDimensions("left")
    });

    fullLineWidth() {
        const { height, width, currentIndex, tabDimensions } = this.props.store;

        if (currentIndex > -1) {
            return (height - height / this.pagesLength)
                + height * 0.5
                - width / this.pagesLength * 0.5
                + tabDimensions[currentIndex].width
        } else {
            return 0
        }
    }

    private fullLineDimensions = (leftProp: "left" | "xOffset") => ({
        width: leftProp === "left"
            ? this.props.store.docScroll / this.pagesLength
            : this.fullLineWidth(),
        [leftProp]: this.props.store.width / this.pagesLength * 0.5
    });

    private underlineTransform = (x): string => {
        return `${IEVersion() <= 11
            ? "none"
            : `translate3d(${x}px, 0, 0)`}`
    };

    private underlineStyle = (isDefault: boolean): ITabData => {
        const { tabDimensions, currentIndex, hoverMenuIndex } = this.props.store;
        // hoverMenuIndex === 0 is intro page
        if (isDefault || currentIndex === -1) {
            return this.fullLineDimensions("xOffset")
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
        console.log(this.underlineStyle(false));

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

export { WideHeaderItem, ITabData };
