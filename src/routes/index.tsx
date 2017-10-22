import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App } from '../containers/index';
import { Home } from '../containers/Home';
import { PAGES } from '../containers/Body/Pages';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>

        {/*pages*/}
        {PAGES.map((page, i) =>
        <Route
            key={`pages-${i}`}
            path={page.path}
            component={Home} />)}
    </Route>
);
