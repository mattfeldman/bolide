import ReactMixin from 'react-mixin';
import { Component, PropTypes } from 'react';

import LightToggle from 'Common/components/LightToggle';
import ColorPickerPopup from 'Common/components/ColorPickerPopup';

@ReactMixin.decorate(ReactMeteorData)
export default class Light extends Component {
    static propTypes = {
        id: React.PropTypes.string.isRequired,
        light: React.PropTypes.object.isRequired
    };

    state = {bri: 0, on: false, rgb: {r: 125, g: 125, b: 125}, showColor: false};

    getMeteorData() {
        var lightState = LightStates.findOne("manual");
        let state = lightState && lightState.lights && lightState.lights[this.props.id];
        if (state) {
            _.extend(this.state, state);
        }
        return {state: state}
    }

    colorString() {
        const state = this.data.state;
        if (!state || !state.rgb) return;
        const {r,g,b} = state.rgb;
        return `rgb(${r},${g},${b})}`;
    }

    onToggleChange(e) {
        this.setState({on: e.target.checked});
        Meteor.call('setLightOn', this.props.id, e.target.checked);
    }

    clickPickColor(e) {
        this.setState({showColor: !this.state.showColor});
    }

    clickRandom() {
        Meteor.call('setLightRandom', this.props.id);
    }

    onColorChange(rgb) {
        this.setState({rgb});
        Meteor.call('setLightColor', this.props.id, rgb.r, rgb.g, rgb.b);
    }

    briSlider(e) {
        this.setState({bri: e.target.value});
        Meteor.call('setLightBrightness', this.props.id, parseFloat(e.target.value));
    }

    headerStyle() {
        let {r,g,b} = this.state.rgb;
        return {backgroundColor: `rgb(${r},${g},${b})`};
    }

    render() {
        return (
            <div className="card">
                <div className="content" style={this.headerStyle()}>
                    <div className="header" style={this.headerStyle()}>{this.props.light.raw.name}</div>
                </div>
                <div className="content">
                    <input id="brightness"
                           type="range"
                           min="1"
                           max="254"
                           onChange={this.briSlider.bind(this)}
                           value={this.state.bri}
                           step="1"
                           style={{width:'100%'}}/>
                </div>
                <div className="content">
                    <ColorPickerPopup fluid value={this.state.rgb} onChange={this.onColorChange.bind(this)}/>
                </div>
                <div className="extra content">
                    <LightToggle value={this.state.on} onChange={this.onToggleChange.bind(this)}/>
                    {!this.props.light.raw.state.reachable ? <i className="ui orange warning icon"></i> : ''}
                    <div className="ui right floated small icon purple basic button random"
                         onClick={this.clickRandom.bind(this)}><i className="random icon"></i></div>
                </div>
            </div>
        );
    }
};