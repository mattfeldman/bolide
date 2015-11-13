const {Link} = ReactRouter;
PluginLayout = React.createClass({
    render(){
        return (
            <div className="row">
                <div className="four wide column">
                    <div className="ui vertical fluid left attached tabular menu">
                        {BolidePlugin.list.map(p=> <Link to={"/plugins/"+p.name} activeClassName="active" className="item">{p.name}</Link>)}
                    </div>
                </div>
                <div className="twelve wide stretched column">
                    <div className="ui segment">
                        {this.props.children ? this.props.children : <span>Select a plugin on the left</span>}
                    </div>
                </div>
            </div>
        );
    }
});