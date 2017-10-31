import { colors, setBodyStyle, setHtmlStyle } from '../data';

const appConfig = require('../../config/main.js');

import * as React from 'react';
import { Helmet } from 'react-helmet';
import { MobxAsyncConnect, asyncConnect, store as mobxAsyncConnect } from 'mobx-async-connect';
import { Fonts } from '../widgets';

class App extends React.Component<any, any> {

    componentDidMount() {
        Fonts();
        setBodyStyle("margin", "0");
        setBodyStyle("color", colors.blk);
        setBodyStyle("background", colors.wht);
        setHtmlStyle("overflowY", "scroll");
    }

    // renderDevTool() {
    //     if (process.env.NODE_ENV !== 'production') {
    //         const DevTools = require('mobx-react-devtools').default;
    //         return (<DevTools />);
    //     }
    // };

    public render() {
        return (
            <section>
                <Helmet {...appConfig.app} {...appConfig.app.head}/>
                {this.props.children}
                {/*{this.renderDevTool()}*/}
            </section>
        );
    }
}

export { App }
export { Html } from './Html';
export { Home } from './Home';
