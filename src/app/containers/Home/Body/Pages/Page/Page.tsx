import * as React from 'react';
import { browserHistory } from 'react-router';
import { IParams, IPage } from "../../../../../../data/models/models";
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import HomeStore from '../../../../../../mobx/stores/HomeStore';
import {colors} from '../../../../../../data/themeOptions';

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
export class Page extends React.Component<IProps, IState> {

    animationFrameId;
    timeoutId;

    @computed public get styles(): any {
        const imagePath = this.props.page.backgroundImagePath;
        return {
            page: {
                position: "relative",
                height: this.props.store.height,
                width: "100%",
                background: !!imagePath ? `linear-gradient(to right, ${colors.blk} 0%, transparent 10%, transparent 90%, ${colors.blk} 100%), url(${imagePath}) center / cover no-repeat` : "",
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
            <div style={ this.styles.page }
                onClick={this.handleClick}>
                {page.component}
            </div>
        );
    }
}
