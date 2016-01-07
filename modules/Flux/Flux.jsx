let Flux = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        let pluginSubscription = Meteor.subscribe('pluginSettings', 'Flux');
        let plugin = PluginSettings.findOne('Flux') || {};
        return {
            location: plugin.location,
            times: plugin.times,
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
                    <div>
                        <FluxLocation onLocationChange={this.onLocationChange} location={this.data.location} />
                        <CurrentTimes sunrise={this.data.times.sunrise.toString()} sunset={this.data.times.sunset.toString()} />
                    </div>
                    }
            </div>
        );
    }
});
let FluxLocation = React.createClass({
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

let CurrentTimes = React.createClass({
    getDefaultProps(){
        return {
            sunrise: 0,
            sunset: 0
        };
    },
    render(){
        return (
            <div>
                <p>Sunrise: {this.props.sunrise}</p>
                <p>Sunset: {this.props.sunset}</p>
            </div>);
    }
});

BolidePlugin.register("Flux", Flux);
export default Flux;