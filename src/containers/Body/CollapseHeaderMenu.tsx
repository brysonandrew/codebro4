import * as React from 'react';
import { browserHistory } from 'react-router';
import { observer, inject } from 'mobx-react';
import { PAGES } from './Pages';
import { IInlineStyles, colors, Store } from '../../data';
import { CollapseHeaderItem } from './CollapseHeaderItem';
import {prefixer} from '../../data/helpers/prefixer';

interface IProps {
    store?: Store
}

@inject('store')
@observer
export class CollapseHeaderMenu extends React.Component<IProps, {}> {

    STYLES: IInlineStyles = {
        p: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: colors.blk,
            color: colors.wht,
            transitionOrigin: "0% 0%",
            transition: "transform 400ms"
        },
        items: prefixer({
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 280,
            transform: "translate(-50%, -50%)"
        }),
        item: {
            position: "relative",
            width: "100%",
            cursor: "pointer"
        }
    };

    handleClick = (path: string, index: number) => {
        browserHistory.push(`/${path}`);
        this.props.store.onCurrentIndexChange(index);
        this.props.store.onAnimationStart();
        this.props.store.onCollapseMenuToggle(false);
    };

    render(): JSX.Element {
        const { isCollapseMenuOpen } = this.props.store;

        return (
            <div style={prefixer({
                ...this.STYLES.p,
                transform: `scaleY(${isCollapseMenuOpen ? 1 : 0})`
            })}>
                {isCollapseMenuOpen
                    ?   <div style={this.STYLES.items}>
                            {PAGES.map((page, i) =>
                                <div
                                    key={`page-${i}`}
                                    style={this.STYLES.item}
                                    onClick={() => this.handleClick(page.path, i)}
                                >
                                    <CollapseHeaderItem
                                        page={page}
                                    />
                                </div>)}
                        </div>
                    :   null}
            </div>
        );
    }
}
