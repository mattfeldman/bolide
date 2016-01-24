import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import Light from './Light.jsx';
import Subscribe from 'Subscriptions/Subscribe';

@ReactMixin.decorate(TrackerReact)
export default class LightPanel extends Component {
    get lights(){
        return Lights.find().fetch();
    }
    get count(){
        let lights = this.lights;
        return lights && lights.length || 0;
    }
    render(){
        return(
          <Subscribe subscriptions={{'lights':null,'manualLightState':null}}>
              <h1 className="ui header">Lights {this.count}
                  {this.renderAllOff()}
              </h1>
              <div className="ui four doubling stackable cards">
                  {this.lights.map(light =>  <Light key={light._id} light={light} id={light._id}/>)}
              </div>
          </Subscribe>
        );
    }
    renderAllOff(){
        if(this.count) {
            return (<div className="ui right floated off button" onClick={this.handleAllOff}>all off</div>);}
    }
    handleAllOff(){
        Meteor.call('allOff');
    }
};