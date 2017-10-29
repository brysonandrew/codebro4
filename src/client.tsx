import * as e6p from 'es6-promise';
(e6p as any).polyfill(); // isomorphic-fetch requires an es6 compatible polyfill
import 'isomorphic-fetch';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { Router, browserHistory } from 'react-router';
import 'isomorphic-fetch';
import routes from './routes';
import {Store} from './data';

declare var window: {
    __INITIAL_STATE__: any,
    location: {
        pathname: string
    }
};

ReactDOM.render(
  <Provider store={new Store(window.__INITIAL_STATE__)} key="provider">
      <Router history={browserHistory}>
          {routes}
      </Router>
  </Provider>,
  document.getElementById('app'),
);
