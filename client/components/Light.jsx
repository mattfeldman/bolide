Light = React.createClass({
    propTypes:{
        id: React.PropTypes.string,
        light: React.PropTypes.object
    },
    mixins: [ReactMeteorData],
    getInitialState(){
        return {bri: 0, on: false}
    },
    getMeteorData(){
        var lightState = LightStates.findOne("manual");
        let state =  lightState && lightState.lights && lightState.lights[this.props.id];
        if(state){
            _.extend(this.state,state);
        }
        return {state: state}
    },
    colorString(){
        const state = this.data.state;
        if(!state || !state.rgb) return;
        const {r,g,b} = state.rgb;
        return `rgb(${r},${g},${b})}`;
    },
    toggledOn(){
        const state = this.data.state;
        return state && state.on || false;
    },
    handleColor(e){

    },
    briSlider(e) {
        this.state.bri = e.target.value;
        Meteor.call('setLightBrightness', this.props.id, parseFloat(e.target.value));
    },
    render(){
        return(
            <div className="card">
                <div className="content">
                    <div className="header">{this.props.light.raw.name}</div>
                </div>
                <div className="content">
                    <input id="brightness" type="range" min="1" max="254" onChange={this.briSlider} value={this.state.bri} step="1"/>
                    <input type='text' className="color" />
                </div>
                <div className="extra content">
                    <div className="ui left floated toggle checkbox">
                        <input id={this.props.light.raw.uniqueid} type="checkbox" name="toggle">
                            <label htmlFor={this.props.light.raw.uniqueid}>{this.state.on ? 'On' : 'Off'}</label>
                        </input>
                        { /*<InputColor defaultValue="#345678" value={this.state.color} onChange={this.handleColor} />*/}
                        <div className="ui right floated small icon purple basic button random"><i className="random icon"></i></div>
                    </div>
                </div>
            </div>
        );
    }
});