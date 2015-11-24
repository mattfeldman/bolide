import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import Light from './Light.jsx';

@ReactMixin.decorate(ReactMeteorData)
export default class ScenePanel extends Component {
    state = {lights:[]};
    getMeteorData(){
        var lightsSub = Meteor.subscribe('lights');
        var sceneSub = Meteor.subscribe('scenes');
        var lights = Lights.find();
        var scenes = Scenes.find();
        return{
            loaded: lightsSub.ready() && sceneSub.ready(),
            lights: lights.fetch(),
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
        },100);
    }
    render(){
        if (!this.data.loaded){
            return <span>Loading...</span>
        }
        return(
          <div>
              <h1 className="ui header">Scenes</h1>
              <div className="container">
                  <select name="lights" id="lightSelector" className="ui multiple search selection dropdown" multiple>
                      <option/>
                      {this.data.lights.map(light =>  <option value={light._id}>{light.raw.name}</option>)}
                  </select>
              </div>
              <div>
                  {this.state.lights.map(light =>  <span>{light}</span>)}
              </div>
          </div>
        );
    }
};