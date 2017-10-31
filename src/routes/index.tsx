import * as React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';
import { App, Home } from '../content';
import { PAGES } from '../content/Body';
import { NotFound } from '../widgets';

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
        <Route path='/404' component={NotFound} />
        <Redirect from='*' to='/404' />
    </Route>
);
