import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import Light from './Light.jsx';
import {Table} from 'reactable';

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
        let data = _.map(this.data.lights, (k,v) => {
            let {raw} = k;
            console.log(raw);
            return {
                id: v,
                uniqueid: raw.uniqueid,
                model: raw.modelid,
                version: raw.swversion,
                name: raw.name,
                alert: raw.state.alert,
                bri: raw.state.bri,
                color: raw.state.colormode,
                ct: raw.state.ct,
                effect: raw.state.effect,
                hue: raw.state.hue,
                on: raw.state.on.toString(),
                reachable: raw.state.reachable.toString(),
                xy: `(${raw.state.xy[0]}, ${raw.state.xy[1]})`
            }
        });
        return(
            <Table className="ui table" data={data} sortable={true}/>
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