import * as React from 'react';
import { inject, observer } from 'mobx-react';
import createHistory from 'history/createBrowserHistory';
import { browserHistory } from 'react-router';
import { toParams, IInlineStyles, Store, EXPERIMENTS_PATHS, colors } from '../data';
import { Main } from './main';
import { Lab } from './lab';
import { CSS_FONT_STRING } from '../widgets';
import {ScreenSaver} from '../widgets/ScreenSaver';
const AWAKE_DURATION = 30000;

interface IProps {
    store?: Store
}

@inject('store')
@observer
export class Home extends React.Component<IProps, {}> {

    STYLES: IInlineStyles = {
        p: {
            id: "home",
            position: "relative",
            color: colors.wht,
            fontFamily: `'${CSS_FONT_STRING}', 'arial', sans-serif`,
            overflow: "hidden"
        }
    };

    parentRef;
    sleepTimeoutId;
    scollTimeoutId;
    timeoutStopDelay = 50;
    isScrolling = false;

    componentDidMount() {
        const { onMeasureViewport, onLocationListen, onLoad } = this.props.store;
        const history = createHistory();

        onLoad(toParams(history.location.pathname));
        browserHistory.listen( location =>  {
            onLocationListen(
                toParams(location.pathname)
            );
        });

        window.scroll(0, 0);
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("resize", () => onMeasureViewport(window.innerWidth, window.innerHeight));
    }

    handleScroll = () => {
        this.props.store.onScroll();
        this.handleWakefullness();
        clearTimeout(this.scollTimeoutId);
        this.scollTimeoutId = setTimeout(() => {
            // back to sleep
        }, 100);
    };

    componentWillUnmount() {
        const { onMeasureViewport } = this.props.store;

        clearTimeout(this.sleepTimeoutId);
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("resize", () => onMeasureViewport(window.innerWidth, window.innerHeight));
    }

    handleWakefullness = () => {
        clearTimeout(this.sleepTimeoutId);
        this.sleepTimeoutId = setTimeout(() => {
            // back to sleep
            this.props.store.onAwake(false);
        }, AWAKE_DURATION);
    };

    private renderHome = () => {
        const activePage = this.props.store.savedParams.get("activePagePath");
        const isLab = EXPERIMENTS_PATHS.indexOf(activePage) > -1;

        if (isLab) {
            return  <Lab activePage={activePage}/>
        } else {
            return  <Main/>
        }
    };

    render(): JSX.Element {
        const { isAwake, onAwake, isMobile, isTablet } = this.props.store;

        return (
            <div
                style={ this.STYLES.p }
                ref={el => el ? (this.parentRef = el) : null}
                onClick={this.handleWakefullness}
                onMouseMove={this.handleWakefullness}
            >
                <ScreenSaver
                    isAwake={isAwake}
                    isMobile={isMobile}
                    isTablet={isTablet}
                    onAwake={onAwake}
                />
                {this.renderHome()}
            </div>
        );
    }
}
