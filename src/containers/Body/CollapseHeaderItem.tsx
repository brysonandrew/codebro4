import * as React from 'react';
import { IPage, IInlineStyles, Store, colors } from '../../data';
import { inject, observer } from 'mobx-react';
import { GlitchText } from '../../widgets';

const FONT_SIZE = 24;
const LINE_HEIGHT = 48;

interface IProps {
    page: IPage
    store?: Store
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
            left: "50%",
            margin: 0,
            padding: "16px 0",
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
                    intensity={FONT_SIZE / 100}
                    width={280}
                    height={LINE_HEIGHT}
                    isActive={this.state.isHovered}
                    backgroundColor={colors.blk}
                    textColor={colors.wht}
                    textContent={this.props.page.name}
                />
            </div>
        );
    }
}
