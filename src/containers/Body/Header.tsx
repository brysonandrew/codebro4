import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { pageList, IInlineStyles, colors } from '../../data';
import { HeaderItem } from '.';
import { HomeStore } from '../../mobx';

const TEXT_HEIGHT = 38;

const STYLES: IInlineStyles = {
    header: {
        id: "header",
        height: TEXT_HEIGHT,
        position: "relative"
    },
    header__bar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        height: 1,
        background: colors.std
    }
};

interface IProps {
    store?: HomeStore<string>
}

@inject('store')
@observer
export class Header extends React.Component<IProps, {}> {

    render(): JSX.Element {
        const { width, docScroll } = this.props.store;

        return (
            <div style={STYLES.header}>
                {pageList.map((page, i) =>
                    <HeaderItem
                        key={`page-${i}`}
                        page={page}
                    />)}
                <div style={{
                    ...STYLES.header__bar, width: docScroll / pageList.length + width / pageList.length * 0.5
                }}/>
            </div>
        );
    }
}
