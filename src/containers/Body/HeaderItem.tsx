import * as React from 'react';
import { browserHistory } from 'react-router';
import { computed } from 'mobx';
import { StaggeredMotion, spring } from 'react-motion';
import { IPage, IInlineStyles } from '../../data';
import { inject, observer } from 'mobx-react';
import { HomeStore } from '../../mobx';

const TEXT_ORIGIN = -8;
const TEXT_TARGET = 0;

const STYLES: IInlineStyles = {
    headerItem: {
        id: "header item",
        position: "relative",
        display: "inline-block",
        cursor: "pointer"
    },
    headerItem__inner: {
        position: "absolute",
        top: -16,
        left: "50%",
        fontSize: 14
    }
};

interface IProps {
    page: IPage
    store?: HomeStore<string>
}

@inject('store')
@observer
export class HeaderItem extends React.Component<IProps, {}> {

    springConfig = { stiffness: 80, damping: 4 };

    handleClick = () => {
        const path = `/${this.props.page.path}`;
        browserHistory.push(path);
        this.props.store.onAnimationStart();
    };

    render(): JSX.Element {
        const params = this.props.store.savedParams;
        const path = this.props.page.path;

        return (
            <StaggeredMotion defaultStyles={[{x: TEXT_ORIGIN}, {x: TEXT_ORIGIN}, {x: TEXT_ORIGIN}, {x: TEXT_ORIGIN}, {x: TEXT_ORIGIN}]}
                styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
                    return i === 0
                        ? {x: spring(params.get("activePagePath") === path ? TEXT_TARGET : TEXT_ORIGIN, this.springConfig)}
                        : {x: spring(prevInterpolatedStyles[i - 1].x)}
                })}>
                {interpolatingStyles => {
                    return  <div
                                style={{...STYLES.headerItem, width: `${100 / this.props.store.pagesLength}%`}}
                                onClick={this.handleClick}
                            >
                            {interpolatingStyles.map((style, styleIndex) =>
                                <h2 key={`style-${styleIndex}`}
                                    style={{...STYLES.headerItem__inner,
                                        transform: `translate3d(${style.x}px, 0, 0)`,
                                        opacity: style.x + (TEXT_ORIGIN - 0.1) * -1
                                    }}
                                >
                                    {this.props.page.name}
                                </h2>)}
                            </div>
                }}
            </StaggeredMotion>
        );
    }
}
