import * as React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';
import { App, Home } from '../app';
import { NotFound } from '../widgets';
import { MAIN_PAGES, EXPERIMENTS, PARTICLES, MODELS, WORK_LABELS, toPath } from '../data';

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
        {/*work-pages*/}
        {WORK_LABELS.map((work, i) =>
            <Route
                key={`selected-work-${i}`}
                path={`/selected-work/${toPath(work.title)}`}
                component={Home}
            />
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
        {MODELS.map((models, i) =>
            <Route
                key={`models-${i}`}
                path={`/models/${models.path}`}
                component={Home}
            />
        )}
        <Route
            key="background"
            path="/background"
            component={Home}
        />
        <Route path='/404' component={NotFound} />
        {/*Google verification*/}
        <Route path='/googlee5c42f8d4283c5d8.html' component={Home} />
        <Redirect from='*' to='/404' />
    </Route>
);
