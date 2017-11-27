import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import { IInlineStyles, prefixer, Store, MAIN_PAGES, IEVersion, colors } from '../../data';

interface IProps {
    store?: Store
}

@inject('store')
@observer
export class Pages extends React.Component<IProps, {}> {

    STYLES: IInlineStyles = {
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
            verticalAlign: "top",
            fontSize: 24,
            color: colors.wht,
            transition: "opacity 1600ms"
        }
    };

    @computed public get widthMargin(): number {
        return -0.5 * this.props.store.width
    }

    @computed public get adjustedScroll(): number {
        return this.props.store.docScroll - (-0.5 * this.props.store.docScroll * 2)
    }

    @computed public get adjustedWidth(): number {
        return this.props.store.width - this.widthMargin * 2
    }

    @computed public get underlineScale(): number {
        return  Math.abs(
            Math.cos(
                (Math.PI * this.props.store.pagesLength)
                * (this.props.store.docScroll / this.props.store.width / this.props.store.pagesLength)
            )
        )
    };

    @computed public get pageTransform(): string {
        return IEVersion() <= 11
            ? `translateX(${-this.adjustedScroll}px)`
            : `translate3d(${-this.adjustedScroll}px, 0, 0) scale(${this.underlineScale})`
    }

    render(): JSX.Element {
        const { pagesLength, height, isAwake, scrollHeight } = this.props.store;
        return (
            <div style={{...this.STYLES.p, height: scrollHeight}}>
                <div style={{...this.STYLES.slider,
                    left: this.widthMargin,
                    width: pagesLength * this.adjustedWidth
                }}>
                {MAIN_PAGES.map((page, i) =>
                    <div key={`page-${i}`}
                         style={prefixer({...this.STYLES.item,
                             width: this.adjustedWidth,
                             height: height,
                             transform: this.pageTransform,
                             opacity: isAwake ? 1 : 0
                         })}>
                        {page.component}
                    </div>)}
                </div>
            </div>
        );
    }
}
