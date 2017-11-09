import * as React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';
import { App, Home } from '../app';
import { NotFound } from '../widgets';
import { MAIN_PAGES, EXPERIMENTS, PARTICLES } from '../data';
import {STRUCTURES} from '../data/experiments/Structures/structureModels/index';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        {/*main-pages*/}
        {MAIN_PAGES.map((page, i) =>
            <Route
                key={`pages-${i}`}
                path={`/${page.path}`}
                component={Home} />
        )}
        {/*lab-pages*/}
        {EXPERIMENTS.map((experiment, i) =>
            <Route
                key={`experiment-${i}`}
                path={`/${experiment.path}`}
                component={Home}
            />
        )}
        {PARTICLES.map((particle, i) =>
            <Route
                key={`particle-${i}`}
                path={`/particles/${particle.path}`}
                component={Home}
            />
        )}
        {STRUCTURES.map((structure, i) =>
            <Route
                key={`structure-${i}`}
                path={`/structure/${structure.path}`}
                component={Home}
            />
        )}
        <Route
            key="background"
            path="/background"
            component={Home}
        />
        <Route path='/404' component={NotFound} />
        <Redirect from='*' to='/404' />
    </Route>
);
