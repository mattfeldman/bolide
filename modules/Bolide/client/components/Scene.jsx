import {PropTypes,Component} from 'react'

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
                <div className="content">
                    {_.map(this.props.scene.substate, (lightstate) => <StateIndicator lightstate={lightstate} />)}
                </div>
            </a>
        );
    }
}
class StateIndicator extends Component {
    static propTypes = {
        lightstate : React.PropTypes.object.isRequired
    };
    render(){
        console.log();
        let {r,g,b} = _.extend({r:255,g:255,b:0},this.props.lightstate.rgb);
        var colorStyle = {
            backgroundColor: `rgb(${r},${g},${b})`,
            width: '2em',
            height: '2em',
            borderRadius:'2em',
            border: '0.1em solid black',
            display: 'inline-block',
            opacity: (this.props.lightstate.bri || 254) / 254
        };
        return <div style={colorStyle}></div>
    }
}
