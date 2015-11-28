import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import ColorPicker from 'react-color';
import CheckboxGroup from 'react-checkbox-group';
import classNames from 'classnames';

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
            substate:  scene.substate,
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

    onColorChange(e) {
        let rgb = _.omit(e.rgb, 'a');
        this.setState({rgb});
    }

    clickPickColor(e) {
        this.setState({showColor: !this.state.showColor});
    }

    onBriChange(e) {
        this.setState({bri: e.target.value});
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
    colorPickerClose(e){
        this.setState({showColor: false});
    }

    saveClick() {
        var newSubState = _.clone(this.state.substate);
        this.state.subselection.map((id)=> {
            newSubState[id] = _.extend(
                newSubState[id] || {},
                {
                    on: this.state.enabledOn ? this.state.on : null,
                    bri: this.state.enabledBri ? this.state.bri : null,
                    color: this.state.enabledColor ? this.state.rgb : null
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
                                   onSelectionChange={this.onLightSelectionChange.bind(this)}/>
                </div>
                <div className="ui dividing header">Scene Configuration</div>
                <CheckboxGroup name="subselection"
                               ref="subSelectionGroup"
                               onChange={this.subSelectionChange.bind(this)}>
                    <table className="ui divided table">
                        <thead>{this.renderControlPanelTable()}</thead>
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
        let rowState = _.defaults(this.state.substate[light] || {}, {on: null, bri: null, color: null});
        return (
            <tr>
                <td>
                    <div className="ui checkbox">
                        <input type="checkbox" value={light}/>
                        <label>{this.data.lights[light].raw.name}</label>
                    </div>
                </td>
                <td>
                    <div className={classNames('ui toggle checkbox', {'checked': rowState.on, 'disabled': rowState.on == null})}>
                        <input type="checkbox" value={light}/>
                        <label>{{true: 'On', false: 'Off', null: 'Not Included'}[rowState.on]}</label>
                    </div>
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
                    {rowState.color == null ? "Not Included" :
                    <div style={{width: 50, height: 30, 'background-color': `rgb(${rowState.color.r},${rowState.color.g},${rowState.color.b})`}}>
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
                    {this.state.subselection.length > 0 ? this.state.subselection.length+" selected" : "No Selection"}
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
                    <div className="ui toggle checkbox">
                        <input type="checkbox" name="public" onChange={this.onToggleOnChange.bind(this)}/>
                        <label>{this.state.on ? 'On' : 'Off'}</label>
                    </div>
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
                    <div className="ui button" onClick={this.clickPickColor.bind(this)}>pick color</div>
                    <div >
                        <ColorPicker type="photoshop"
                                     color={this.state.rgb}
                                     position="above"
                                     display={this.state.showColor}
                                     onChange={this.onColorChange.bind(this)}
                                     onClose={this.colorPickerClose.bind(this)}/>
                    </div>
                </th>
            </tr>
            </thead>
        );
    }
};

class LightSelector extends Component {
    static propTypes = {
        lights: React.PropTypes.object.isRequired,
        onSelectionChange: React.PropTypes.func.isRequired,
    };

    componentDidMount() {
        let self = this;
        $(self.refs.lightSelectionRef.getDOMNode()).dropdown({
            onChange(value){
                self.props.onSelectionChange(value);
            }
        });
    }

    render() {
        return (
            <div className="ui labeled fluid input">
                <div className="ui label">Scene Lights</div>
                <select name="lights"
                        id="lightSelector"
                        ref="lightSelectionRef"
                        className="ui multiple fluid search selection dropdown"
                        multiple>
                    <option/>
                    {_.values(this.props.lights).map( light =>  <option value={light._id}>{light.raw.name}</option>)}
                </select>
            </div>);
    }
}

class SceneSelector extends Component {
    static propTypes = {
        scenes: React.PropTypes.object.isRequired,
        onSceneLoad: React.PropTypes.func.isRequired,
        onSceneRemove: React.PropTypes.func,
    };

    componentDidMount() {
        let self = this;
        $(self.refs.sceneSelectionRef.getDOMNode()).dropdown({
            onChange(value){
                self.setState({selected: value});
            }
        });
    }

    loadClick() {
        this.props.onSceneLoad(this.state.selected);
    }

    removeClick() {
        this.props.onSceneRemove(this.state.selected);
        $(this.refs.sceneSelectionRef.getDOMNode()).dropdown('clear');
    }

    render() {
        return (
            <div className="ui attached action labeled fluid input">
                <div className="ui label">Scenes</div>
                <select name="scenes"
                        ref="sceneSelectionRef"
                        className="ui fluid search selection dropdown">
                    <option/>
                    {_.values(this.props.scenes).map( scene =>  <option value={scene._id}>{scene.name}</option>)}
                </select>
                <button className="ui primary button" onClick={this.loadClick.bind(this)}>Load</button>
                {this.props.onSceneRemove ? <button className="ui red button" onClick={this.removeClick.bind(this)}>Delete</button> : null}
            </div>);
    }
}