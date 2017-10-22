import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { IInlineStyles, colors } from '../../data';
import { HeaderItem } from '.';
import { HomeStore } from '../../mobx';
import { PAGES } from './Pages';

const TEXT_HEIGHT = 38;

interface IProps {
    store?: HomeStore<string>
}

@inject('store')
@observer
export class Header extends React.Component<IProps, {}> {

    STYLES: IInlineStyles = {
        header: {
            id: "header",
            height: TEXT_HEIGHT,
            position: "relative",
            color: colors.blk
        },
        header__bar: {
            position: "absolute",
            bottom: 0,
            left: 0,
            height: 1,
            background: colors.blk
        }
    };

    private posFromZero = () => ({
        ...this.STYLES.header__bar
        , width: this.props.store.docScroll / this.props.store.pageLength + this.props.store.width / this.props.store.pageLength * 0.5});

    render(): JSX.Element {
        return (
            <div style={this.STYLES.header}>
                {PAGES.map((page, i) =>
                    <HeaderItem
                        key={`page-${i}`}
                        page={page}
                    />)}
                <div style={this.posFromZero()}/>
            </div>
        );
    }
}
