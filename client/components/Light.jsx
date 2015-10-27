Light = React.createClass({
    propTypes:{
        id: React.PropTypes.string,
        light: React.PropTypes.object
    },
    mixins: [ReactMeteorData],
    getInitialState(){
        return {bri: 0, on: false, rgb: {r:255,g:0,b:0}, showColor: false}
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
    clickPickColor(e){
        this.setState({showColor: !this.state.showColor});
    },
    onColorChange(e){
        let rgb =  _(e.rgb).omit('a');
        this.setState({rgb});
        Meteor.call('setLightColor', this.props.id, rgb.r, rgb.g, rgb.b);
    },
    briSlider(e) {
        this.state.bri = e.target.value;
        Meteor.call('setLightBrightness', this.props.id, parseFloat(e.target.value));
    },
    headerStyle(){
        let {r,g,b} = this.state.rgb;
        return {backgroundColor: `rgb(${r},${g},${b})`};
    },
    render(){
        return(
            <div className="card">
                <div className="content" style={this.headerStyle()}>
                    <div className="header" style={this.headerStyle()}>{this.props.light.raw.name}</div>
                </div>
                <div className="content">
                    <input id="brightness" type="range" min="1" max="254" onChange={this.briSlider} value={this.state.bri} step="1"/>
                </div>
                <div className="content">
                    <div className="ui button" onClick={this.clickPickColor}>pick color</div>
                    <ColorPicker type="photoshop" color={this.state.rgb} position="below" display={this.state.showColor} onChange={this.onColorChange}/>
                </div>
                <div className="extra content">
                    <div className="ui left floated toggle checkbox">
                        <input id={this.props.light.raw.uniqueid} type="checkbox" name="toggle">
                            <label htmlFor={this.props.light.raw.uniqueid}>{this.state.on ? 'On' : 'Off'}</label>
                        </input>
                        <div className="ui right floated small icon purple basic button random"><i className="random icon"></i></div>
                    </div>
                </div>
            </div>
        );
    }
});