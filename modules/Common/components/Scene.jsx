import {PropTypes,Component} from 'react'
import ReactMixin from 'react-mixin'

export default class Scene extends Component {
    static propTypes = {
        onClick: React.PropTypes.func.isRequired,
        scene: React.PropTypes.object.isRequired
    };
    render(){
        let lightCount = _.keys(this.props.scene.substate).length;
        return (
            <a className="ui link card" onClick={this.props.onClick.bind(this, this.props.scene)}>
                <div className="content">
                    <div className="header">
                        {this.props.scene.name}
                    </div>
                    <div className="meta">{lightCount} lights</div>
                </div>
                <div className="ui list content">
                    {_.map(this.props.scene.substate, (lightstate, i) => <StateIndicator key={i} lightstate={lightstate} lightId={i} />)}
                </div>
            </a>
        );
    }
}

@ReactMixin.decorate(ReactMeteorData)
class StateIndicator extends Component {
    getMeteorData() {
        let loading = !Meteor.subscribe('lights').ready();
        let light = Lights.findOne(this.props.lightId);
        return {
            light: light,
            loading: loading
        }
    }
    static propTypes = {
        lightstate : React.PropTypes.object.isRequired,
        lightId: React.PropTypes.string.isRequired
    };
    render(){
        let defaultColor = this.props.lightstate.on === false ? {r:20,g:20,b:20} : {r:255,g:255,b:0};
        let {r,g,b} = _.extend(defaultColor, this.props.lightstate.rgb);
        var colorStyle = {
            backgroundColor: `rgb(${r},${g},${b})`,
            width: '2em',
            height: '2em',
            borderRadius:'50%',
            float: 'left',
            border: '1px solid black',
            opacity: (this.props.lightstate.bri || 254) / 254
        };
        return (
            <div className="item">
                <div style={colorStyle}></div>
                <div className="ui left pointing basic circular label">
                {this.data.loading ? "..." : this.data.light.raw.name}
                </div>
            </div>
        );
    }
}
