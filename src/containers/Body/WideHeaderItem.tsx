import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { IPage, IInlineStyles, colors, Store } from '../../data';
import { GlitchText } from '../../widgets';
const FONT_SIZE = 14;

const STYLES: IInlineStyles = {
    p: {
        id: "wide header item",
        position: "absolute",
        top: -16,
        left: "50%",
        margin: 0,
        padding: "16px 0"
    },
    placeholder: {
        fontSize: FONT_SIZE
    }
};

export interface ITabData {
    width: number
    xOffset: number
}

interface IProps {
    index: number
    page: IPage
    store?: Store
}

interface IState {
    isHovered
}

@inject('store')
@observer
export class WideHeaderItem extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        };
    }

    componentDidMount() {
        this.props.store.onWideHeaderItemMount(true);
    }

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
        const { tabDimensions, onMeasureTabByRef, currentIndex, isWideHeaderItemMounted } = this.props.store;
        const { index, page } = this.props;

        return (
            <div
                key={page.name}
                style={STYLES.p}
                ref={(el) => onMeasureTabByRef(el, index)}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                {isWideHeaderItemMounted
                    ?   <GlitchText
                            fontSize={FONT_SIZE}
                            width={tabDimensions[index].width}
                            height={FONT_SIZE * 1.5}
                            isActive={this.state.isHovered || index === currentIndex}
                            backgroundColor={colors.wht}
                            textColor={colors.blk}
                            textContent={page.name}
                        />
                    :   <div style={STYLES.placeholder}>
                            {page.name}
                        </div>}
            </div>

        );
    }
}
