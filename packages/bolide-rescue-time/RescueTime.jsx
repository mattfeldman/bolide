RescueTime = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        let pluginSubscription = Meteor.subscribe('pluginSettings', 'rescueTime');
        let lightSubscription = Meteor.subscribe('lights');
        let plugin = PluginSettings.findOne('rescueTime') || {};
        return {
            key: plugin.key || "not set",
            enabled: plugin.enabled || false,
            light: plugin.light || "",
            lights: Lights.find().fetch(),
            loaded: pluginSubscription.ready() && lightSubscription.ready()
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
                        selectedLight={this.data.selectedLight}
                        lights={this.data.lights}
                        light={this.data.light}
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
        lights: React.PropTypes.array.isRequired,
        light: React.PropTypes.string.isRequired
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
                <div className="field">
                    <label>Select Light</label>
                    <select onChange={this.lightChange} value={this.state.light} ref="lightSelect">
                        {this.props.lights.map(l =><option key={l._id} value={l._id}>{l._id} - {l.raw.name}</option>)}
                    </select>
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
    lightChange(e){
        let light = ReactDOM.findDOMNode(this.refs.lightSelect).value;
        this.setState({light: light});
    },
    componentWillReceiveProps(newProp){
        this.setState({key: newProp.apiKey, enabled: newProp.enabled, light: newProp.light});
    },
    componentWillMount(){
        this.setState({key: this.props.apiKey, enabled: this.props.enabled, light: this.props.light});
    }
});
BolidePlugin.register("RescueTime", RescueTime);