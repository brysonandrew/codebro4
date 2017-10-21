import * as React from 'react';
import { browserHistory } from 'react-router';
import { StaggeredMotion, spring } from 'react-motion';
import { computed } from 'mobx';
import { IPage, IInlineStyles, pageList } from '../../data';
import { inject, observer } from 'mobx-react';
import { HomeStore } from '../../mobx';

const TEXT_HEIGHT = 2;

const STYLES: IInlineStyles = {
    headerItem: {
        id: "header item",
        position: "relative",
        display: "inline-block",
        height: TEXT_HEIGHT * 2,
        width: `${100 / pageList.length}%`,
        cursor: "pointer"
    },
    headerItem__inner: {
        position: "absolute",
        top: -16,
        left: "50%",
        fontSize: 14,
        transform: "translateX(-50%)"
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

    @computed public get isSelected(): boolean {
        const { store, page } = this.props;
        return store.savedParams.get("activePagePath") === page.path;
    }

    handleClick = () => {
        const { page } = this.props;
        const { onAnimationStart } = this.props.store;

        const path = `/${page.path}`;
        browserHistory.push(path);
        onAnimationStart();
    };

    render(): JSX.Element {
        const { page } = this.props;
        const isSelected = this.isSelected;
        return (
            <StaggeredMotion defaultStyles={[{y: -TEXT_HEIGHT}, {y: -TEXT_HEIGHT}, {y: -TEXT_HEIGHT}, {y: -TEXT_HEIGHT}, {y: -TEXT_HEIGHT}]}
                styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
                    return i === 0
                        ? {y: spring(isSelected ? TEXT_HEIGHT : -TEXT_HEIGHT, this.springConfig)}
                        : {y: spring(prevInterpolatedStyles[i - 1].y)}
                })}>
                {interpolatingStyles =>
                    <div
                        style={STYLES.headerItem}
                        onClick={this.handleClick}
                    >
                        {interpolatingStyles.map((style, styleIndex) =>
                            <h2 key={`style-${styleIndex}`}
                                 style={{...STYLES.headerItem__inner,
                                     transform: `translateY(${style.y}px)`,
                                     opacity: style.y + (TEXT_HEIGHT + 0.1)
                                 }}
                            >
                                {page.name}
                            </h2>)
                        }
                    </div>
                }
            </StaggeredMotion>
        );
    }
}
