import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import CheckboxGroup from 'react-checkbox-group';
import classNames from 'classnames';

import LightToggle from 'Common/components/LightToggle';
import ColorPickerPopup from 'Common/components/ColorPickerPopup';
import LightSelector from 'Common/components/LightSelector';
import SceneSelector from 'Common/components/SceneSelector';

@ReactMixin.decorate(ReactMeteorData)
export default class ScenePanel extends Component {
    state = {lights: [], showColor: false, substate: {}, subselection: []};

    getMeteorData() {
        var lightsSub = Meteor.subscribe('lights');
        var sceneSub = Meteor.subscribe('scenes');
        var lights = Lights.find();
        var scenes = Scenes.find();
        return {
            loaded: lightsSub.ready() && sceneSub.ready(),
            lights: _.indexBy(lights.fetch(), '_id'),
            scenes: scenes.fetch()
        }
    }

    onSceneLoad(name) {
        let scene = Scenes.findOne(name);
        this.setState({
            lights: _.keys(scene.substate),
            substate: scene.substate,
            sceneName: scene.name,
            sceneId: scene._id
        });
    }

    onSceneRemove(name) {
        Meteor.call('removeScene', name)
    }

    onLightSelectionChange(lights) {
        this.setState({lights: lights})
    }

    onColorChange(rgb) {
        this.setState({rgb});
    }

    onBriChange(e) {
        this.setState({bri: parseInt(e.target.value)});
    }

    onToggleOnChange(e) {
        this.setState({on: e.target.checked});
    }

    subSelectionChange(e) {
        var subSelection = _.without(this.refs.subSelectionGroup.getCheckedValues(), "on");
        this.setState({subselection: subSelection});
    }

    onCheckOn(e) {
        this.setState({enabledOn: e.target.checked});
    }

    onCheckBri(e) {
        this.setState({enabledBri: e.target.checked});
    }

    onCheckColor(e) {
        this.setState({enabledColor: e.target.checked});
    }

    saveClick() {
        var newSubState = _.clone(this.state.substate);
        this.state.subselection.map((id)=> {
            newSubState[id] = _.extend(
                newSubState[id] || {},
                {
                    on: this.state.enabledOn ? this.state.on : null,
                    bri: this.state.enabledBri ? this.state.bri : null,
                    rgb: this.state.enabledColor ? this.state.rgb : null
                });
        });
        this.setState({substate: newSubState});
    }

    onStateNameChange(e) {
        this.setState({sceneName: e.target.value});
    }

    onSaveScene() {
        Meteor.call('setScene', this.state.sceneName, this.state.substate, this.state.sceneId);
    }

    render() {
        if (!this.data.loaded) {
            return <span>Loading...</span>
        }
        return (
            <div className="ui container" ref="root">
                <h1 className="ui header">Scenes</h1>
                <div className="ui dividing header">Light Selection</div>
                <div className="container">
                    <LightSelector lights={this.data.lights}
                                   selected={this.state.lights}
                                   onSelectionChange={this.onLightSelectionChange.bind(this)}/>
                </div>
                <div className="ui dividing header">Scene Configuration</div>
                <CheckboxGroup name="subselection"
                               ref="subSelectionGroup"
                               onChange={this.subSelectionChange.bind(this)}>
                    <table className="ui divided table">
                        {this.renderControlPanelTable()}
                        <tbody>{this.state.lights.map(light => this.renderStateRow(light))}</tbody>
                    </table>
                </CheckboxGroup>
                <div className="ui divider"></div>
                <div className="ui two column equal width grid">
                    <div className="column">
                        <div className="ui dividing header">Save Scene</div>
                        <div className="ui fluid action labeled input">
                            <div className="ui label">Scene Name</div>
                            <input type="text"
                                   name="sceneName"
                                   placeholder="Name this state"
                                   value={this.state.sceneName}
                                   onChange={this.onStateNameChange.bind(this)}/>
                            <button className="ui button" onClick={this.onSaveScene.bind(this)}>Save</button>
                        </div>
                    </div>
                    <div className="column">
                        <div className="ui dividing header">Load Scene</div>
                        <SceneSelector scenes={this.data.scenes}
                                       onSceneLoad={this.onSceneLoad.bind(this)}
                                       onSceneRemove={this.onSceneRemove.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }

    renderStateRow(light) {
        let rowState = _.defaults(this.state.substate[light] || {}, {on: null, bri: null, rgb: null});
        return (
            <tr key={light._id}>
                <td>
                    <div className="ui checkbox">
                        <input type="checkbox" value={light}/>
                        <label>{this.data.lights[light].raw.name}</label>
                    </div>
                </td>
                <td>
                    <LightToggle value={rowState.on}/>
                </td>
                <td>
                    <input id="brightness"
                           type="range"
                           min="1"
                           max="254"
                           disabled={rowState.bri == null ? "disabled" :""}
                           value={rowState.bri}
                           step="1"/>
                </td>
                <td>
                    {rowState.rgb == null ? "Not Included" :
                        <div style={{width: 50, height: 30, 'backgroundColor': `rgb(${rowState.rgb.r},${rowState.rgb.g},${rowState.rgb.b})`}}>
                        </div>
                    }
                </td>
            </tr>
        );
    }

    renderControlPanelTable() {
        return (
            <thead>
            <tr>
                <th>
                    {this.state.subselection.length > 0 ? this.state.subselection.length + " selected" : "No Selection"}
                </th>
                <th>
                    <div className="ui checkbox">
                        <input type="checkbox" name="example" onChange={this.onCheckOn.bind(this)}/>
                        <label>Enabled</label>
                    </div>
                </th>
                <th>
                    <div className="ui checkbox">
                        <input type="checkbox" name="example" onChange={this.onCheckBri.bind(this)}/>
                        <label>Brightness</label>
                    </div>
                </th>
                <th>
                    <div className="ui checkbox">
                        <input type="checkbox" name="example" onChange={this.onCheckColor.bind(this)}/>
                        <label>Color</label>
                    </div>
                </th>
            </tr>
            <tr>
                <th>
                    <div className={classNames('ui primary button',{disabled: this.state.subselection.length < 1})}
                         onClick={this.saveClick.bind(this)}>apply
                    </div>
                </th>
                <th className="column">
                    <LightToggle value={this.state.on} onChange={this.onToggleOnChange.bind(this)}/>
                </th>
                <th>
                    <input id="brightness"
                           type="range"
                           min="1"
                           max="254"
                           onChange={this.onBriChange.bind(this)}
                           value={this.state.bri}
                           step="1"/>
                </th>
                <th>
                    <ColorPickerPopup value={this.state.rgb} onChange={this.onColorChange.bind(this)}/>
                </th>
            </tr>
            </thead>
        );
    }
};