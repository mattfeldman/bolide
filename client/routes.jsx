const {Router, Route} = ReactRouter;

//const history = ReactRouter.history.useQueries(ReactRouter.history.createHistory)()

Meteor.startup(function() {
    React.render((
        <Router>
            <Route path="/" component={MainLayout}>
                <Route path="/" component={LightPanel} />
                <Route path="/lights" component={LightPanel} />
                <Route path="bridge" component={Bridge} />
                <Route path="logs" component={Logs} />
            </Route>
        </Router>
    ), document.body);
});