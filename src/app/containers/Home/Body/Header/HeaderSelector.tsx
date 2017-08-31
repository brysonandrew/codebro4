import * as React from 'react';
import { browserHistory } from 'react-router';
import { StaggeredMotion, spring } from 'react-motion';
import { computed } from 'mobx';
import { IPage } from '../../../../../data/models/models';
import { inject, observer } from 'mobx-react';
import HomeStore from '../../../../../mobx/stores/HomeStore';

interface IProps {
    page: IPage
    store?: HomeStore<string>
}

interface IState {}

@inject('store')
@observer
export class HeaderSelector extends React.Component<IProps, IState> {

    springConfig = { stiffness: 80, damping: 4 };

    @computed public get styles(): any {
        return {
            headerSelector: {
                position: "relative",
                cursor: "pointer"
            },
            headerSelector__inner: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50, -50%)"

            }
        };
    }

    @computed public get isSelected(): boolean {
        const { store, page } = this.props;
        return store.savedParams.get("activePagePath") === page.path;
    }

    public constructor(props?: any, context?: any) {
        super(props, context);
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
            <StaggeredMotion defaultStyles={[{y: 0}, {y: 0}, {y: 0}, {y: 0}, {y: 0}]}
                styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
                    return i === 0
                        ? {y: spring(isSelected ? 6 : 1, this.springConfig)}
                        : {y: spring(prevInterpolatedStyles[i - 1].y)}
                })}>
                {interpolatingStyles =>
                    <div style={this.styles.headerSelector} onClick={this.handleClick}>
                        {interpolatingStyles.map((style, styleIndex) =>
                            <div key={`style-${styleIndex}`}
                                 style={{...this.styles.headerSelector__inner,
                                     transform: `translateY(${style.y}px)`,
                                     opacity: style.y * 0.1}}>
                                {page.name}
                            </div>)
                        }
                    </div>
                }
            </StaggeredMotion>
        );
    }
}
