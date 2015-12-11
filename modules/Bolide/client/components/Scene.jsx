import {PropTypes,Component} from 'react'

export default class Scene extends Component {
    static propTypes = {
        onClick: React.PropTypes.func.isRequired,
        scene: React.PropTypes.object.isRequired
    };
    render(){
        return (<div className="ui button" onClick={this.props.onClick.bind(this, this.props.scene)}>{this.props.scene.name}</div>);
    }
}
