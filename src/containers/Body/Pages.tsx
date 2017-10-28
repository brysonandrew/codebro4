import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import { PagesItem } from "./";
import { Intro, Gallery, Video, Work, Contact, IInlineStyles, IPage, toPath, prefixer } from '../../data';
import { HomeStore} from '../../mobx';

function Page(name, component) {
    this.name = name;
    this.path = toPath(this.name);
    this.component = component;
}

export const PAGES: IPage[] = [
    new Page(
        "Intro",
        <Intro/>
    ),
    new Page(
        "Gallery [NEW]",
        <Gallery/>
    ),
    new Page(
        "Video",
        <Video/>
    ),
    new Page(
        "Work",
        <Work/>
    ),
    new Page(
        "Contact",
        <Contact/>
    )
];

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
    store?: HomeStore
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

    render(): JSX.Element {
        return (
            <div style={{...STYLES.pages, height: this.scrollHeight}}>
                <div style={{...STYLES.pages__slider,
                    left: this.widthMargin,
                    width: this.props.store.pagesLength * this.adjustedWidth
                }}>
                    {PAGES.map((page, i) =>
                        <div key={`page-${i}`}
                             style={prefixer({...STYLES.pages__item,
                                 width: this.adjustedWidth,
                                 height: this.props.store.height,
                                 transform: `translate3d(${-this.adjustedScroll}px, 0, 0)`
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
