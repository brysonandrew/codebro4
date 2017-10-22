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
            height: 1,
            background: colors.blk
        },
        header__dot: {
            position: "absolute",
            top: -3,
            right: -24,
            height: 6,
            width: 24,
            background: colors.blk
        }
    };

    private posFromZero = () => ({
        ...this.STYLES.header__bar,
        width: this.props.store.docScroll / this.props.store.pagesLength,
        left: this.props.store.width / this.props.store.pagesLength * 0.5
    });

    private dotScale = (): number => Math.abs(Math.cos((Math.PI * this.props.store.pagesLength) * (this.props.store.docScroll / this.props.store.width / this.props.store.pagesLength)));

    private dotStyle = () => ({
        ...this.STYLES.header__dot,
        transform: `scale(${this.dotScale()})`
    });

    render(): JSX.Element {
        return (
            <div style={this.STYLES.header}>
                {PAGES.map((page, i) =>
                    <HeaderItem
                        key={`page-${i}`}
                        page={page}
                    />)}
                <div style={this.posFromZero()}>
                    <div style={this.dotStyle()}/>
                </div>
            </div>
        );
    }
}
