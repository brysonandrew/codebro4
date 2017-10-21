import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import createHistory from 'history/createBrowserHistory';
import { browserHistory } from 'react-router';
import { Header, Pages } from './Body';
import { ScreenSaver } from '../widgets/ScreenSaver';
import { toParams, colors, listeners, resetIdle } from '../data';
import HomeStore from '../mobx/stores/HomeStore';

interface IState {
    isMounted: boolean
}

interface IProps {
    store?: HomeStore<string>
}

@inject('store')
@observer
export class Home extends React.Component<IProps, IState> {

    parentRef;
    idleTimeoutId;
    mountTimeoutId;
    isFirstRender = true;

    @computed public get styles(): any {
        return {
            home: {
                position: "relative",
                textAlign: "left",
                background: colors.blk,
                overflow: "hidden"
            },
            home__title: {
                transform: "rotate(90deg) translateX(-100%)"
            },
            home__pages: {
                opacity: this.state.isMounted ? 1 : 0,
                filter: this.state.isMounted ? "none" : "blur(10px)",
                transition: "opacity 1600ms, filter 1600ms"
            }
        };
    }

    constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false
        };
    }

    componentDidMount() {
        const { onResizeViewport, onLocationListen, onLoad } = this.props.store;

        this.isFirstRender = false;
        // reset window pos
        window.scroll(0, 0);

        const history = createHistory();
    // initial save params
        onLoad(toParams(history.location.pathname));
    // listen to future params
        browserHistory.listen( location =>  {
            onLocationListen(
                toParams(location.pathname)
            );
        });

        this.mountTimeoutId = setTimeout(() => this.setState({ isMounted: true }), 0);

        listeners(window, "resize", "addEventListener", () => onResizeViewport(window.innerWidth, window.innerHeight));
        listeners(this.parentRef, "interaction", "addEventListener", () => resetIdle(this));
    }

    componentWillUnmount() {
        const { onResizeViewport } = this.props.store;

        clearTimeout(this.idleTimeoutId);

        listeners(window, "resize", "removeEventListener", () => onResizeViewport(window.innerWidth, window.innerHeight));
        listeners(this.parentRef, "interaction", "removeEventListener", () => resetIdle(this));
    }

    render(): JSX.Element {
        const { isMounted } = this.state;
        return (
            <div style={ this.styles.home }
                 ref={el => el ? (this.parentRef = el) : null}>
                <h1 style={this.styles.home__title}>
                    code bro
                </h1>
                <div>
                    <Header/>
                </div>
                <div style={ this.styles.home__pages }>
                    <Pages/>
                </div>
                {!isMounted
                    &&  <div>
                            <ScreenSaver
                                isFirstRender={this.isFirstRender}
                            />
                        </div>}
            </div>
        );
    }
}
