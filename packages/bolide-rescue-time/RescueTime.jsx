RescueTime = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        let subscription = Meteor.subscribe('pluginSettings', 'rescueTime');
        let plugin = PluginSettings.findOne('rescueTime') || {};
        return {
            key: plugin.key || "not set",
            enabled: plugin.enabled || false,
            loaded: subscription.ready()
        };
    },
    save(state){
        Meteor.call('updateSetting','rescueTime', state);
    },
    render(){
        return(
            <div>
                <div className="ui header">RescueTime Plugin</div>
                {!this.data.loaded ?
                    'Loading..' :
                    <RescueTimeKey
                        enabled={this.data.enabled}
                        apiKey={this.data.key}
                        save={this.save}/>}
            </div>
        );
    }
});
RescueTimeKey = React.createClass({
    propTypes:{
        apiKey: React.PropTypes.string.isRequired,
        enabled: React.PropTypes.bool.isRequired,
        save: React.PropTypes.func.isRequired,
    },
    render(){
        return (
            <form className="ui form" onSubmit={this.handleSubmit}>
                <div className="field">
                    <label>RescueTime API Key</label>
                    <input name="location" value={this.state.key} onChange={this.keyChange}></input>
                </div>
                <div className="field">
                    <div className="ui toggle checkbox">
                        <input type="checkbox" checked={this.state.enabled} onChange={this.enableChange}></input>
                        <label>{this.state.enabled ? "Enabled" : "Disabled"}</label>
                    </div>
                </div>
                <button className="ui button" type="submit">Save</button>
            </form>
        );
    },
    handleSubmit(e){
        e.preventDefault();
        this.props.save(this.state);
    },
    keyChange(e){
        this.setState({key:e.target.value});
    },
    enableChange(e){
        this.setState({enabled:e.target.checked});
    },
    componentWillReceiveProps(newProp){
        this.setState({key: newProp.apiKey, enabled: newProp.enabled});
    },
    componentWillMount(){
        this.setState({key: this.props.apiKey, enabled: this.props.enabled});
    }
});
BolidePlugin.register("RescueTime", RescueTime);