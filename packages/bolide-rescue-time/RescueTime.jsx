RescueTime = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        let subscription = Meteor.subscribe('pluginSettings', 'rescueTime');
        let plugin = PluginSettings.findOne('rescueTime') || {};
        return {key: plugin.key || "not set", loaded: subscription.ready()};
    },
    save(state){
        Meteor.call('updateSetting','rescueTime', state);
    },
    render(){
        return(
            <div>
                <div className="ui header">RescueTime Plugin</div>
                {!this.data.loaded ? 'Loading..' : <RescueTimeKey apiKey={this.data.key} save={this.save}/>}
            </div>
        );
    }
});
RescueTimeKey = React.createClass({
    propTypes:{
        apiKey: React.PropTypes.string.isRequired,
        save: React.PropTypes.func.isRequired
    },
    render(){
        return (
            <form className="ui form" onSubmit={this.handleSubmit}>
                <div className="field">
                    <label>RescueTime API Key</label>
                    <input name="location" value={this.state.key} onChange={this.handleChange}></input>
                </div>
                <button className="ui button" type="submit">Save</button>
            </form>
        );
    },
    handleSubmit(e){
        e.preventDefault();
        this.props.save(this.state);
    },
    handleChange(e){
        this.setState({key:e.target.value});
    },
    componentWillMount(){
        this.setState({key: this.props.apiKey});
    }
});
BolidePlugin.register("RescueTime", RescueTime);