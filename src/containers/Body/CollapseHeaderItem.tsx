import * as React from 'react';
import { browserHistory } from 'react-router';
import { StaggeredMotion, spring } from 'react-motion';
import { IPage, IInlineStyles, prefixer } from '../../data';
import { inject, observer } from 'mobx-react';
import { HomeStore } from '../../mobx';

const TEXT_ORIGIN = -8;
const TEXT_TARGET = 0;

const STYLES: IInlineStyles = {
    p: {
        id: "header item",
        position: "relative",
        width: "100%",
        display: "inline-block",
        cursor: "pointer"
    },
    content: {
        position: "absolute",
        top: -16,
        left: "50%",
        margin: 0,
        padding: "16px 0",
        fontSize: 14
    }
};

interface IProps {
    page: IPage
    store?: HomeStore<string>
}

@inject('store')
@observer
export class CollapseHeaderItem extends React.Component<IProps, {}> {

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
                {interpolatingStyles =>
                    <div
                        style={{...STYLES.p, width: `${100 / this.props.store.pagesLength}%`}}
                        onClick={this.handleClick}
                    >
                        {interpolatingStyles.map((style, styleIndex) =>
                            <h2 key={`style-${styleIndex}`}
                                style={prefixer({...STYLES.content,
                                    transform: `translate3d(${style.x}px, 0, 0)`,
                                    opacity: style.x + (TEXT_ORIGIN - 0.1) * -1
                                })}
                            >
                                {this.props.page.name}
                            </h2>)}
                    </div>
                }}
            </StaggeredMotion>
        );
    }
}
