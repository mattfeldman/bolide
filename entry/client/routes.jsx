console.log("\nroutes.jsx\n");
import { Route } from 'react-router';

import todoRoutes from 'TodoApp/client/routes'
ReactRouterSSR.Run(
  <Route>
    {todoRoutes}
  </Route>
);