import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, Home } from '../containers/index';
import { PAGES } from '../containers/Body';
import { NotFound } from '../widgets/NotFound';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>

        {/*pages*/}
        {PAGES.map((page, i) =>
            <Route
                key={`pages-${i}`}
                path={page.path}
                component={Home} />
        )}
    </Route>
);
