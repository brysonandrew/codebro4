import * as React from 'react';
import { pages } from '../../../../../data/content/pages/pages';
import { IParams } from '../../../../../data/models';
import { colors } from '../../../../../data/themeOptions';

interface IProps {
    savedParams: IParams
}

interface IState {
    isSwitchingPages: boolean
}

export class Pages extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isSwitchingPages: false
        };
        this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const isActivePagePathChanged = nextProps.savedParams.activePagePath !== this.props.savedParams.activePagePath;
        const isParamsChanged = this.props.savedParams.activePagePath && isActivePagePathChanged;
        if (isParamsChanged) {
            this.setState({
                isSwitchingPages: true
            });
        }
    }

    handleTransitionEnd() {
        this.setState({
            isSwitchingPages: false
        });
    }

    render(): JSX.Element {
        const { savedParams } = this.props;
        const { isSwitchingPages } = this.state;

        const activePagePath = savedParams.activePagePath ? savedParams.activePagePath : "portfolio";
        const isPortfolio = activePagePath === "portfolio";
        const component = pages[activePagePath].component;

        const styles = {
            pages: {
                position: "relative"
            },
            pages__slider: {
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                background: (isPortfolio && !isSwitchingPages)
                        ? "transparent"
                        : colors.std,
                transform: `translateY(${isPortfolio ? 100 : -100}%)`,
                transition: "transform 1600ms",
                zIndex: 10
            }
        } as any;

        return (
            <div style={ styles.pages }>
                <div style={ styles.pages__slider }
                     onTransitionEnd={this.handleTransitionEnd}/>
                {component}
            </div>
        );
    }
}
