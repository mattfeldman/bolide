import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import Light from './Light.jsx';
import {Table, Tr, Td} from 'reactable';
import classNames from 'classnames';

@ReactMixin.decorate(ReactMeteorData)
export default class DebugPanel extends Component {
    getMeteorData() {
        var lightsSub = Meteor.subscribe('lights');
        var stateSub = Meteor.subscribe('manualLightState');
        var lights = Lights.find();
        return {
            loaded: lightsSub.ready() && stateSub.ready(),
            count: lights.count(),
            lights: lights.fetch()
        }

    }

    render() {
        if (!this.data.loaded) {
            return <span>Loading...</span>
        }
        return (
            <Table className="ui sortable selectable table" sortable={true}>
                {this.data.lights.map((light) =>
                    <Tr className={classNames({'warning':!light.raw.state.reachable})}>
                        <Td column="id">{light.id}</Td>
                        <Td column="uniqueid">{light.raw.uniqueid}</Td>
                        <Td column="model">{light.raw.modelid}</Td>
                        <Td column="version">{light.raw.swversion}</Td>
                        <Td column="name">{light.raw.name}</Td>
                        <Td column="alert">{light.raw.state.alert}</Td>
                        <Td column="bri">{light.raw.state.bri}</Td>
                        <Td column="color">{light.raw.state.colormode}</Td>
                        <Td column="ct">{light.raw.state.ct}</Td>
                        <Td column="effect">{light.raw.state.effect}</Td>
                        <Td column="hue">{light.raw.state.hue}</Td>
                        <Td column="on"
                            className={classNames({'positive':light.raw.state.on, 'error': !light.raw.state.on})}>{light.raw.state.on.toString()}</Td>
                        <Td column="reachable">{light.raw.state.reachable.toString()}</Td>
                    </Tr>
                )}
            </Table>
        );
    }
};