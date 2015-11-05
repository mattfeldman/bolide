RescueTime = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        Meteor.subscribe('pluginSettings','rescueTime');
        const plugin = PluginSettings.findOne('rescueTime');
        return {plugin: plugin};
    },
    getInitialState(){
        return {key: ""}
    },
    handleChange(){
        PluginSettings.upsert({_id:'rescueTime'}, this.state);
    },
    render(){
        return(
            <div>
                <div className="ui header">RescueTime Plugin</div>
                <div className="content">Hello World, TODO: configure RescueTime here.</div>
                <input name="location" value={this.state.key} onChange={this.handleChange}></input>
            </div>
        );
    }
});
BolidePlugin.register("RescueTime", RescueTime);