import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import Light from './Light.jsx';
import ColorPicker from 'react-color';
import CheckboxGroup from 'react-checkbox-group';
import classNames from 'classnames';
@ReactMixin.decorate(ReactMeteorData)
export default class ScenePanel extends Component {
    state = {lights:[], showColor: false, substate:{}, subselection:[]};
    getMeteorData(){
        var lightsSub = Meteor.subscribe('lights');
        var sceneSub = Meteor.subscribe('scenes');
        var lights = Lights.find();
        var scenes = Scenes.find();
        return{
            loaded: lightsSub.ready() && sceneSub.ready(),
            lights: _.indexBy(lights.fetch(),'_id'),
            scenes: scenes.fetch()
        }

    }
    componentDidMount(){
        let setLights = (lights) => this.setState({lights: lights});
        setTimeout(function(){
            $('.ui.dropdown').dropdown({
                onChange(value){
                    setLights(value);
                }
            });
        }, 100);
    }
    onColorChange(e){
        let rgb =  _.omit(e.rgb,'a');
        this.setState({rgb});
    }
    clickPickColor(e){
        this.setState({showColor: !this.state.showColor});
    }
    onBriChange(e){
        this.setState({bri: e.target.value});
    }
    onToggleOnChange(e){
        this.setState({on: e.target.checked});
    }
    subSelectionChange(e){
        var subSelection = _.without(this.refs.subSelectionGroup.getCheckedValues(), "on");
        this.setState({subselection: subSelection});
    }
    onCheckOn(e){
        this.setState({enabledOn: e.target.checked});
    }
    onCheckBri(e){
        this.setState({enabledBri: e.target.checked});
    }
    onCheckColor(e){
        this.setState({enabledColor: e.target.checked});
    }
    saveClick(){
        var newSubState = _.clone(this.state.substate);
        this.state.subselection.map((id)=> {
            newSubState[id] = _.extend(
                newSubState[id] || {},
                {
                    on: this.state.enabledOn ? this.state.on : undefined,
                    bri: this.state.enabledBri ? this.state.bri : undefined,
                    color: this.state.enabledColor ? this.state.rgb : undefined
                });
        });
        this.setState({substate: newSubState});
    }
    render(){
        if (!this.data.loaded){
            return <span>Loading...</span>
        }
        return(
          <div className="ui container">

              <h1 className="ui header">Scenes</h1>
              <div className="container">
                  <select name="lights" id="lightSelector" className="ui multiple search selection dropdown" multiple>
                      <option/>
                      {_.values(this.data.lights).map( light =>  <option value={light._id}>{light.raw.name}</option>)}
                  </select>
              </div>
              <CheckboxGroup name="subselection" ref="subSelectionGroup" onChange={this.subSelectionChange.bind(this)}>
              <table className="ui divided table">
                  <thead>
                    {this.renderControlPanelTable()}
                  </thead>
                  <tbody>
                      {this.state.lights.map(light => this.renderStateRow(light))}
                  </tbody>
              </table>
              </CheckboxGroup>
          </div>
        );
    }
    renderStateRow(light){
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
                    <input id="brightness" type="range" min="1" max="254" disabled={rowState.bri == null ? "disabled" :""} value={rowState.bri} step="1"/>
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
    renderControlPanelTable(){
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
                        <div className={classNames('ui primary button',{disabled: this.state.subselection.length < 1})} onClick={this.saveClick.bind(this)}>apply</div>
                    </th>
                    <th className="column">
                        <div className="ui toggle checkbox">
                            <input type="checkbox" name="public" onChange={this.onToggleOnChange.bind(this)}/>
                            <label>Enabled</label>
                        </div>
                    </th>
                    <th>
                        <input id="brightness" type="range" min="1" max="254" onChange={this.onBriChange.bind(this)} value={this.state.bri} step="1"/>
                    </th>
                    <th>
                        <div className="ui button" onClick={this.clickPickColor.bind(this)}>pick color</div>
                        <div>
                            <ColorPicker type="photoshop" color={this.state.rgb} position="below" display={this.state.showColor} onChange={this.onColorChange.bind(this)}/>
                        </div>
                    </th>
                </tr>
            </thead>
        );
    }
};