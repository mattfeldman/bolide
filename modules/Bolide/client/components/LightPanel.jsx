LightPanel = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        var lightsSub = Meteor.subscribe('lights');
        var stateSub = Meteor.subscribe('manualLightState');
        var lights = Lights.find();
        return{
            loaded: lightsSub.ready() && stateSub.ready(),
            count: lights.count(),
            lights: lights.fetch()
        }

    },
    render(){
        if (!this.data.loaded){
            return <span>Loading...</span>
        }
        return(
          <div>
              <h1 className="ui header">Lights {this.data.count}
                  {this.renderAllOff()}
              </h1>
              <div className="ui four cards">
                  {this.data.lights.map(light =>  <Light light={light} id={light._id}/>)}
              </div>
          </div>
        );
    },
    renderAllOff(){
        if(this.data.count) {
            return (<div className="ui right floated off button" onClick={this.handleAllOff}>all off</div>);}
    },
    handleAllOff(){
        Meteor.call('allOff');
    }
});