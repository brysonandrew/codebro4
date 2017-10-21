import * as React from 'react';
import { colors } from '../../data/themeOptions';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { IInlineStyles } from '../../data/models';

interface IProps {
    isFirstRender: boolean
}

interface IState {
    isMounted: boolean
}

@observer
export class ScreenSaver extends React.Component<IProps, IState> {

    mountTimeout;

    @computed public get styles(): IInlineStyles {
        const { isMounted } = this.state;
        const { isFirstRender } = this.props;
        return {
            screenSaver: {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: colors.blk,
                opacity: isMounted || isFirstRender ? 1 : 0,
                filter: isMounted || isFirstRender ? "none" : "blur(10px)",
                transition: "opacity 1600ms, filter 1600ms",
                zIndex: 20
            },
            screenSaver__inner: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(2)",
            }
        };
    }

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false
        };
    }

    componentDidMount() {
        this.mountTimeout = setTimeout(() => this.setState({ isMounted: true }), 0);
    }

    componentWillUnmount() {
        clearTimeout(this.mountTimeout);
    }

    render(): JSX.Element {

        return (
            <div style={this.styles.screenSaver}>
                <div style={this.styles.screenSaver__inner}>
                    <h1>code bro</h1>
                </div>
            </div>
        );
    }
}
