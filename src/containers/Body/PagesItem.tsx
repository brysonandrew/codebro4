import * as React from 'react';
import { browserHistory } from 'react-router';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import { IParams, IPage, colors } from "../../data";
import { HomeStore } from '../../mobx';

interface IProps {
    index: number
    page: IPage
    store?: HomeStore<string>
    previewWidth?: number
    offsetTop?: number
}

interface IState {
    isHovered?: boolean
    isHeadingHovered?: boolean
    isProjectExtended?: boolean
    posY?: number
    isImagesLoading?: boolean
}

@inject('store')
@observer
export class PagesItem extends React.Component<IProps, IState> {

    animationFrameId;
    timeoutId;

    @computed public get styles(): any {
        return {
            pagesItem: {
                position: "relative",
                height: this.props.store.height,
                width: "100%",
                zIndex: 0
            }
        };
    }

    @computed public get isActive(): any {
        const { page, index } = this.props;
        const { savedParams } = this.props.store;
        return page.path === savedParams.get("activePagePath")
            || (!savedParams.get("activePagePath") && index === 0);
    }

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false,
            isHeadingHovered: false,
            isProjectExtended: false,
            isImagesLoading: false,
            posY: 0
        };
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
        cancelAnimationFrame(this.animationFrameId);
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

        return (
            <div
                className="cb-pages-item"
                style={ this.styles.pagesItem }
                onClick={this.handleClick}
            >
                {page.component}
            </div>
        );
    }
}
