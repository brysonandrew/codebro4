import * as React from 'react';
import { inject, observer } from 'mobx-react';
import createHistory from 'history/createBrowserHistory';
import { browserHistory } from 'react-router';
import { Header, Pages } from './Body';
import { ScreenSaver, MotionScroll } from '../widgets';
import { toParams, listeners, resetIdle, IInlineStyles } from '../data';
import { HomeStore } from '../mobx';

const STYLES: IInlineStyles = {
    home: {
        id: "home",
        position: "relative",
        fontFamily: "'Advent Pro', 'arial', sans-serif",
        overflow: "hidden"
    },
    home__header: {
        id: "home header",
        position: "fixed",
        left: 0,
        top: 0,
        textAlign: "left",
        width: "100%",
        zIndex: 10
    },
    home__title: {
        id: "home title",
        position: "absolute",
        left: 0,
        fontSize: 28,
        transform: "rotate(-90deg) translate(200%, 0)"
    }
};

interface IState {
    docScroll: number
}

interface IProps {
    store?: HomeStore<string>
}

@inject('store')
@observer
export class Home extends React.Component<IProps, IState> {

    parentRef;
    idleTimeoutId;
    timeoutStopDelay = 50;
    isWheelRecorded = false;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            docScroll: 0
        };
    }

    componentDidMount() {
        const { onResizeViewport, onLocationListen, onLoad, onScroll, onWheel } = this.props.store;

        const history = createHistory();
        onLoad(toParams(history.location.pathname));
        browserHistory.listen( location =>  {
            onLocationListen(
                toParams(location.pathname)
            );
        });

        window.scroll(0, 0);
        window.addEventListener("scroll", onScroll);
        window.addEventListener("wheel", onWheel);
        listeners(window, "resize", "addEventListener", () => onResizeViewport(window.innerWidth, window.innerHeight));
        listeners(this.parentRef, "interaction", "addEventListener", () => resetIdle(this));
    }

    componentWillUnmount() {
        const { onResizeViewport, onScroll, onWheel } = this.props.store;
        clearTimeout(this.idleTimeoutId);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("wheel", onWheel);
        listeners(window, "resize", "removeEventListener", () => onResizeViewport(window.innerWidth, window.innerHeight));
        listeners(this.parentRef, "interaction", "removeEventListener", () => resetIdle(this));
    }

    render(): JSX.Element {
        const { onAnimationEnd, isAnimating, isAppMounted, projectOffsets, docScroll, savedParams } = this.props.store;

        return (
            <div
                className="cb-home"
                style={ STYLES.home }
                ref={el => el ? (this.parentRef = el) : null}
            >
                <div style={{...STYLES.home__title, top: `${50 / this.props.store.pageLength}%`}}>
                    <h1>code bro</h1>
                </div>
                <div style={ STYLES.home__header }>
                    <Header/>
                </div>
                <Pages/>
                <ScreenSaver
                    isScreenSaver={!isAppMounted}
                />
                {!!projectOffsets
                    ?   <MotionScroll
                            docScroll={docScroll}
                            isAnimating={isAnimating}
                            scrollTarget={projectOffsets[savedParams.get("activePagePath")]}
                            onRest={onAnimationEnd}
                        />
                    :   null}
            </div>
        );
    }
}
