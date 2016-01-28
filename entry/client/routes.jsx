import { Route } from 'react-router';

import todoRoutes from 'Bolide/client/routes'
ReactRouterSSR.Run(
    <Route>
        {todoRoutes}
    </Route>
);
