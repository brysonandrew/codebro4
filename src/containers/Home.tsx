import * as React from 'react';
import { inject, observer } from 'mobx-react';
import createHistory from 'history/createBrowserHistory';
import { browserHistory } from 'react-router';
import { CollapseHeader, WideHeader, Pages } from './Body';
import { ScreenSaver, MotionScroll } from '../widgets';
import { toParams, listeners, resetIdle, IInlineStyles, Background, prefixer, breakPointTests } from '../data';
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
    home__title: prefixer({
        id: "home title",
        position: "absolute",
        left: 0,
        fontSize: 28,
        transform: "rotate(-90deg) translate(50%, -25%)"
    }),
    home__background: {
        position: "fixed",
        top: 0,
        left: 0
    }
};

interface IProps {
    store?: HomeStore<string>
}

@inject('store')
@observer
export class Home extends React.Component<IProps, {}> {

    parentRef;
    backgroundRef;
    idleTimeoutId;
    timeoutStopDelay = 50;
    isWheelRecorded = false;

    componentDidMount() {
        const { onResizeViewport, onLocationListen, onLoad, onScroll } = this.props.store;

        const history = createHistory();
        onLoad(toParams(history.location.pathname));
        browserHistory.listen( location =>  {
            onLocationListen(
                toParams(location.pathname)
            );
        });

        window.scroll(0, 0);
        window.addEventListener("scroll", onScroll);
        listeners(window, "addEventListener", "resize", () => onResizeViewport(window.innerWidth, window.innerHeight));
        listeners(this.parentRef, "addEventListener", "interaction", () => resetIdle(this));
    }

    componentWillUnmount() {
        const { onResizeViewport, onScroll } = this.props.store;

        clearTimeout(this.idleTimeoutId);
        window.removeEventListener("scroll", onScroll);
        listeners(window, "removeEventListener", "resize", () => onResizeViewport(window.innerWidth, window.innerHeight));
        listeners(this.parentRef, "removeEventListener", "interaction", () => resetIdle(this));
    }

    render(): JSX.Element {
        const { onAnimationEnd, isAnimating, isAppMounted, projectOffsets, docScroll, savedParams, width, height } = this.props.store;

        return (
            <div
                style={ STYLES.home }
                ref={el => el ? (this.parentRef = el) : null}
            >
                <div
                    style={{...STYLES.home__background}}
                    ref={el => el ? (this.backgroundRef = el) : null}
                >
                    {!!this.backgroundRef && width > 0 && height > 0
                        ?   <Background
                                docScroll={docScroll}
                                width={width}
                                height={height}
                                parentEl={this.backgroundRef}
                            />
                        :   null}
                </div>
                <div style={{...STYLES.home__title, top: height * 0.5}}>
                    <h1>code bro</h1>
                </div>
                <div style={ STYLES.home__header }>
                    {breakPointTests.isTablet(width)
                        ?   <CollapseHeader/>
                        :   <WideHeader/>}
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
