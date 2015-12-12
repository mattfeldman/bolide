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
            </a>
        );
    }
}
