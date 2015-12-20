Flux = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        let pluginSubscription = Meteor.subscribe('pluginSettings', 'Flux');
        let plugin = PluginSettings.findOne('Flux') || {};
        return {
            location: plugin.location,
            loaded: pluginSubscription.ready()
        };
    },
    onLocationChange(location){
        Meteor.call('updateSetting','Flux', {location});
    },
    render(){
        return(
            <div>
                <div className="ui header">Flux Plugin</div>
                {!this.data.loaded ?
                    'Loading..' :
                    <FluxLocation onLocationChange={this.onLocationChange} location={this.data.location} />}
            </div>
        );
    }
});
FluxLocation = React.createClass({
    getDefaultProps(){
        return {
            location: {
                latitude: 0,
                longitude: 0
            }
        };
    },
    onLocateClick(){
        navigator.geolocation.getCurrentPosition((geo)=>{
            let {latitude, longitude} = geo.coords;
            this.props.onLocationChange({latitude, longitude});
        });
    },
    render(){
        return (
            <div className="ui form">
                <div className="inline fields">
                    <div className="field">
                        <label>Latitude</label>
                        <input readOnly name="lat" value={this.props.location.latitude}></input>
                    </div>
                    <div className="field">
                        <label>Longitude</label>
                        <input readOnly name="lat" value={this.props.location.longitude}></input>
                    </div>
                    <div className="ui orange labeled icon button" onClick={this.onLocateClick}><i className="map icon"></i>Locate</div>
                </div>
            </div>
        );
    }
});
BolidePlugin.register("Flux", Flux);