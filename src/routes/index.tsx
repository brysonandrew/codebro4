import * as React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';
import { App, Home } from '../app';
import { PAGES } from '../app/Body';
import { NotFound } from '../widgets';
import {EXPERIMENTS} from '../data/experiments/index';

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
        {EXPERIMENTS.map((experiment, i) =>
            <Route
                key={`experiment-${i}`}
                path={experiment.path}
                component={Home} />
        )}
        <Route path='/404' component={NotFound} />
        <Redirect from='*' to='/404' />
    </Route>
);
