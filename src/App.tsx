import React, { Suspense, Fragment } from 'react';

import { Provider } from 'react-redux';

import store from './redux/redux';

import {
  // BrowserRouter as Router,
  Route,
  Switch,
  HashRouter,
  Redirect,
  // RouteComponentProps,
} from 'react-router-dom';

import config from './config';

import Err404 from './views/err404';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Fragment>
            <Suspense fallback={<span className="page-spin"></span>}>
              <Switch>
                {config.routers.map((route: any, i: any) => {
                  return <Route key={i} {...route} />;
                })}
                <Redirect path="/" to={{ pathname: '/login' }} />
                <Route component={Err404} />
              </Switch>
            </Suspense>
          </Fragment>
        </Switch>
      </HashRouter>
    </Provider>
  );
}
export default App;
