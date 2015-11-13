import { Route, IndexRoute } from 'react-router';
import MainLayout from './components/MainLayout';
import LightPanel from './components/LightPanel';
import Bridge from './components/Bridge';
import Logs from './components/Logs';
import PluginLayout from './components/PluginLayout';
export default (
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
);
