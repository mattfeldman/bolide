const {Router, Route} = ReactRouter;

const history = ReactRouter.history.useQueries(ReactRouter.history.createHistory)();
Meteor.startup(function() {
    React.render((
        <Router history={history}>
            <Route path="/" component={MainLayout}>
                <Route path="/" component={LightPanel} />
                <Route path="lights" component={LightPanel} />
                <Route path="bridge" component={Bridge} />
                <Route path="logs" component={Logs} />
                <Route path="/plugins" component={PluginLayout}>
                    <Route path="/" component=""/>
                    {BolidePlugin.list.map(p => <Route path={p.name} component={p.component}/>)}
                </Route>
            </Route>

        </Router>
    ), document.body);
});