import * as React from 'react';
import { inject, observer } from 'mobx-react';
import createHistory from 'history/createBrowserHistory';
import { browserHistory } from 'react-router';
import { toParams, listeners, resetIdle, IInlineStyles, Store, EXPERIMENTS_PATHS, colors } from '../data';
import { Main } from './main';
import { Lab } from './lab';
import { CSS_FONT_STRING } from '../widgets';

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
            color: colors.blk,
            background: colors.wht,
            fontFamily: `'${CSS_FONT_STRING}', 'arial', sans-serif`,
            overflow: "hidden"
        }
    };

    parentRef;
    idleTimeoutId;
    timeoutStopDelay = 50;

    componentDidMount() {
        const { onMeasureViewport, onLocationListen, onLoad, onScroll } = this.props.store;
        const history = createHistory();

        onLoad(toParams(history.location.pathname));
        browserHistory.listen( location =>  {
            onLocationListen(
                toParams(location.pathname)
            );
        });

        window.scroll(0, 0);
        window.addEventListener("scroll", onScroll);
        window.addEventListener("resize", () => onMeasureViewport(window.innerWidth, window.innerHeight));
        listeners(this.parentRef, "addEventListener", "interaction", () => resetIdle(this));
    }

    componentWillUnmount() {
        const { onMeasureViewport, onScroll } = this.props.store;

        clearTimeout(this.idleTimeoutId);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", () => onMeasureViewport(window.innerWidth, window.innerHeight));
        listeners(this.parentRef, "removeEventListener", "interaction", () => resetIdle(this));
    }

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
        return (
            <div
                style={ this.STYLES.p }
                ref={el => el ? (this.parentRef = el) : null}
            >
                {this.renderHome()}
            </div>
        );
    }
}
