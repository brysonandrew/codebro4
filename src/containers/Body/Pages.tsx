import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import { PagesItem } from "./";
import { pageList, IInlineStyles } from '../../data';
import { HomeStore} from '../../mobx';

const STYLES: IInlineStyles = {
    pages: {
        id: "pages",
        position: "relative"
    },
    pages__slider: {
        position: "fixed",
        top: 0
    },
    pages__item: {
        display: "inline-block",
        position: "relative",
        verticalAlign: "top"
    }
};

interface IProps {
    docScroll: number
    store?: HomeStore<string>
}

@inject('store')
@observer
export class Pages extends React.Component<IProps, {}> {

    @computed public get widthMarginFactor(): any {
        return Pages.calcWidthMarginFactor(
            this.props.store.isMobile,
            this.props.store.isTablet,
            this.props.store.isLaptop
        );
    }

    @computed public get widthMargin(): any {
        return this.widthMarginFactor * this.props.store.width
    }

    @computed public get adjustedWidth(): any {
        return this.props.store.width - this.widthMargin * 2
    }

    static calcWidthMarginFactor(isMobile, isTablet, isLaptop) {
        return  isMobile
                    ?   0
                    :   isTablet
                            ?   -0.0675
                            :   isLaptop
                                    ?   -0.125
                                    :   -0.25;
    }

    render(): JSX.Element {
        const { height, width, isMobile, isTablet, isLaptop } = this.props.store;

        const scrollHeight = width * (pageList.length - 1);
        const widthMarginFactor = Pages.calcWidthMarginFactor(isMobile, isTablet, isLaptop);
        const adjustedScroll = this.props.docScroll - (widthMarginFactor * this.props.docScroll * 2);

        return (
            <div style={{...STYLES.pages, height: height + scrollHeight}}>
                <div style={{...STYLES.pages__slider,
                    left: this.widthMargin,
                    width: pageList.length * this.adjustedWidth
                }}>
                    {pageList.map((page, i) =>
                        <div key={`page-${i}`}
                             style={{...STYLES.pages__item,
                                 width: this.adjustedWidth,
                                 height: height,
                                 transform: `translate3d(${-adjustedScroll}px, 0, 0)`
                             }}>
                            <PagesItem
                                index={i}
                                page={page}
                                previewWidth={this.adjustedWidth}
                            />
                        </div>)}
                </div>
            </div>
        );
    }
}
