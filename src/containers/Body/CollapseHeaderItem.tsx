import * as React from 'react';
import { IPage, IInlineStyles } from '../../data';
import { inject, observer } from 'mobx-react';
import { HomeStore } from '../../mobx';
import { GlitchText } from '../../widgets';
import {colors} from '../../data/themeOptions';

const FONT_SIZE = 24;

interface IProps {
    page: IPage
    store?: HomeStore
}

interface IState {
    isHovered
}

@inject('store')
@observer
export class CollapseHeaderItem extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        };
    }

    STYLES: IInlineStyles = {
        p: {
            top: -16,
            left: "50%",
            margin: 0,
            padding: "16px 0",
        },
        font: {
            fontSize: FONT_SIZE
        }
    };

    handleMouseEnter = () => {
        this.setState({
            isHovered: true
        })
    };

    handleMouseLeave = () => {
        this.setState({
            isHovered: false
        })
    };

    render(): JSX.Element {
        return (
            <div
                key={this.props.page.name + 1}
                style={this.STYLES.p}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <GlitchText
                    fontSize={FONT_SIZE}
                    width={280}
                    height={50}
                    isActive={this.state.isHovered}
                    backgroundColor={colors.blk}
                    textColor={colors.wht}
                    textContent={this.props.page.name}
                />
            </div>
        );
    }
}
