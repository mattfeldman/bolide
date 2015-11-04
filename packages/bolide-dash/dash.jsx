Dash = React.createClass({
    render(){
        return(
            <div>
                <div className="ui header">Dash Plugin</div>
                <div className="content">Hello World, TODO: configure dash here.</div>
            </div>
        );
    }
});
BolidePlugin.register("dash", Dash);