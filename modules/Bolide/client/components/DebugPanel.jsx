import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import Light from './Light.jsx';

@ReactMixin.decorate(ReactMeteorData)
export default class DebugPanel extends Component {
    getMeteorData(){
        var lightsSub = Meteor.subscribe('lights');
        var stateSub = Meteor.subscribe('manualLightState');
        var lights = Lights.find();
        return{
            loaded: lightsSub.ready() && stateSub.ready(),
            count: lights.count(),
            lights: lights.fetch()
        }

    }
    render(){
        if (!this.data.loaded){
            return <span>Loading...</span>
        }
        return(
            <div>
                <table className="ui selectable striped celled table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>uniqueid</th>
                            <th>name</th>
                            <th>alert</th>
                            <th>bri</th>
                            <th>colormode</th>
                            <th>ct</th>
                            <th>effect</th>
                            <th>hue</th>
                            <th>on</th>
                            <th>reachable</th>
                            <th>xy</th>
                        </tr>
                    </thead>
                    <tbody>                        {this.data.lights.map(light =>  <RawLightInfo key={light._id} light={light} id={light._id}/>)}
                    </tbody>
                </table>
            </div>
        );
    }
};

class RawLightInfo extends Component{
    render(){
        let raw = this.props.light.raw;
        return(
            <tr>
                <td>{this.props.id}</td>
                <td>{raw.uniqueid}</td>
                <td>{raw.name}</td>
                <td>{raw.state.alert}</td>
                <td>{raw.state.bri}</td>
                <td>{raw.state.colormode}</td>
                <td>{raw.state.ct}</td>
                <td>{raw.state.effect}</td>
                <td>{raw.state.hue}</td>
                <td>{raw.state.on.toString()}</td>
                <td>{raw.state.reachable.toString()}</td>
                <td>{`(${raw.state.xy[0]}, ${raw.state.xy[1]})`}</td>
            </tr>
        );
    }
}