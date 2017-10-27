import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { PAGES } from './Pages';
import { IInlineStyles } from '../../data/models';
import {colors} from '../../data/themeOptions';
import {HomeStore} from '../../mobx';
import {CollapseHeaderItem} from './CollapseHeaderItem';

const STYLES: IInlineStyles = {
    p: {
        position: 'relative',
        width: "100%",
        height: "100vh",
        background: colors.blk,
        color: colors.wht,
        transition: "transform 400ms"
    }
};

interface IProps {
    store?: HomeStore<string>
}

@inject('store')
@observer
export class CollapseHeaderMenu extends React.Component<IProps, {}> {

    render(): JSX.Element {
        const { isCollapseMenu } = this.props.store;

        return (
            <div style={{
                ...STYLES.p,
                transform: `scaleY(${isCollapseMenu ? 1 : 0})`
            }}>
                {isCollapseMenu
                    ?   PAGES.map((page, i) =>
                            <div key={`page-${i}`}>
                                <CollapseHeaderItem
                                    page={page}
                                />
                            </div>)
                    :   null}
            </div>
        );
    }
}
