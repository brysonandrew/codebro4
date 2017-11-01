import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import { PagesItem } from ".";
import { IInlineStyles, prefixer, Store, MAIN_PAGES, IEVersion } from '../../data';

const STYLES: IInlineStyles = {
    p: {
        id: "pages",
        position: "relative"
    },
    slider: {
        position: "fixed",
        top: 0
    },
    item: {
        display: "inline-block",
        position: "relative",
        verticalAlign: "top"
    }
};

interface IProps {
    store?: Store
}

@inject('store')
@observer
export class Pages extends React.Component<IProps, {}> {

    @computed public get widthMargin(): number {
        return -0.5 * this.props.store.width
    }

    @computed public get adjustedScroll(): number {
        return this.props.store.docScroll - (-0.5 * this.props.store.docScroll * 2)
    }

    @computed public get scrollHeight(): number {
        return this.props.store.height + this.props.store.width * (this.props.store.pagesLength - 1)
    }

    @computed public get adjustedWidth(): number {
        return this.props.store.width - this.widthMargin * 2
    }

    @computed public get pageTransform(): string {
        return IEVersion() <= 11
            ? `translateX(${-this.adjustedScroll}px)`
            : `translate3d(${-this.adjustedScroll}px, 0, 0)`
    }

    render(): JSX.Element {
        return (
            <div style={{...STYLES.p, height: this.scrollHeight}}>
                <div style={{...STYLES.slider,
                    left: this.widthMargin,
                    width: this.props.store.pagesLength * this.adjustedWidth
                }}>
                    {MAIN_PAGES.map((page, i) =>
                        <div key={`page-${i}`}
                             style={prefixer({...STYLES.item,
                                 width: this.adjustedWidth,
                                 height: this.props.store.height,
                                 transform: this.pageTransform
                             })}>
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
