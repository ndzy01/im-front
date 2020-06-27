import { RouteProps } from 'react-router';
import { lazy } from 'react';

let routes: IRouteItem[] = [
  {
    path: '/login',
    view: 'login/index',
  },
  {
    path: '/talk',
    view: 'talk/index',
  },
];
interface IRouteItem extends RouteProps {
  view?: string;
  components?: string;
}

for (const item of routes) {
  if (item.view) {
    item.component = lazy(() => import(('../views/' + item.view) as string));
  }
  if (item.components) {
    item.component = lazy(() =>
      import(('../components/' + item.components) as string)
    );
  }
}

export default routes;
