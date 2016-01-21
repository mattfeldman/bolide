import SceneSelector from 'Common/components/SceneSelector';
import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';

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
        Meteor.call('updateSetting', 'Flux', {location});
    },
    render(){
        return(
            <div>
                <div className="ui header">Flux Plugin</div>
                {!this.data.loaded ?
                    'Loading..' :
                    <div>
                        <FluxLocation onLocationChange={this.onLocationChange} location={this.data.location} />
                        {this.data.times ?
                            <div className="ui equal width grid">
                                <TimeSceneSelection label="sunrise" time={this.data.times.sunrise.toString()}/>
                                <TimeSceneSelection label="sunset" time={this.data.times.sunset.toString()}/>
                            </div>
                            :
                            <span>Input your location to set scenes.</span>}
                    </div>
                    }
            </div>
        );
    }
});
let FluxLocation = React.createClass({
    getDefaultProps(){
        return {
            location:{latitude:null,longitude: null}
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

@ReactMixin.decorate(ReactMeteorData)
class TimeSceneSelection extends Component {
    static propTypes = {
        label: React.PropTypes.string,
        time: React.PropTypes.string,
        scene: React.PropTypes.string
    };
    getMeteorData() {
        var sceneSub = Meteor.subscribe('scenes');
        var scenes = Scenes.find();
        return {
            loaded: sceneSub.ready(),
            scenes: scenes.fetch()
        }
    }
    onSceneChange(value){
        let sceneSelection = {};
        sceneSelection[this.props.label] = value;
        Meteor.call('updateSetting', 'Flux', {sceneSelection});
    }
    render(){
        return(
            <div className="ui column">
                <h4 className="ui header">
                    {this.props.label}
                    <div className="sub header">
                        {this.props.time}
                    </div>
                </h4>
                <SceneSelector scenes={this.data.scenes} onChange={this.onSceneChange.bind(this)} />
            </div>
        );
    }
}


BolidePlugin.register("Flux", Flux);