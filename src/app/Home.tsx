import * as React from 'react';
import { inject, observer } from 'mobx-react';
import createHistory from 'history/createBrowserHistory';
import { browserHistory } from 'react-router';
import { toParams, listeners, resetIdle, IInlineStyles, Store
    , MAIN_PAGES_PATHS, EXPERIMENTS_DICT, EXPERIMENTS_PATHS } from '../data';
import { Main } from './Main';
import {NotFound} from '../widgets/NotFound';

const STYLES: IInlineStyles = {
    p: {
        id: "home",
        position: "relative",
        fontFamily: "'Advent Pro', 'arial', sans-serif",
        overflow: "hidden"
    }
};

interface IProps {
    store?: Store
}

@inject('store')
@observer
export class Home extends React.Component<IProps, {}> {

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

    renderHome = () => {
        const activePage = this.props.store.savedParams.get("activePagePath");
        const isMain = MAIN_PAGES_PATHS.indexOf(activePage) > -1;
        const isLab = EXPERIMENTS_PATHS.indexOf(activePage) > -1;

        if (isMain) {
            return  <Main/>
        } else if (isLab) {
            return  <div>
                        {EXPERIMENTS_DICT[activePage].component}
                    </div>
        } else {
            return <NotFound/>
        }

    };

    render(): JSX.Element {
        return (
            <div
                style={ STYLES.p }
                ref={el => el ? (this.parentRef = el) : null}
            >
                {this.renderHome()}
            </div>
        );
    }
}
