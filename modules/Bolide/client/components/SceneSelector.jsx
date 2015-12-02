import { Component, PropTypes } from 'react';
export default class SceneSelector extends Component {
    static propTypes = {
        scenes: React.PropTypes.array.isRequired,
        onSceneLoad: React.PropTypes.func.isRequired,
        onSceneRemove: React.PropTypes.func,
    };

    componentDidMount() {
        let self = this;
        $(self.refs.sceneSelectionRef.getDOMNode()).dropdown({
            onChange(value){
                self.setState({selected: value});
            }
        });
    }

    loadClick() {
        this.props.onSceneLoad(this.state.selected);
    }

    removeClick() {
        this.props.onSceneRemove(this.state.selected);
        $(this.refs.sceneSelectionRef.getDOMNode()).dropdown('clear');
    }

    render() {
        return (
            <div className="ui attached action labeled fluid input">
                <div className="ui label">Scenes</div>
                <select name="scenes"
                        ref="sceneSelectionRef"
                        className="ui fluid search selection dropdown">
                    <option/>
                    {_.values(this.props.scenes).map( scene =>  <option key={scene._id} value={scene._id}>{scene.name}</option>)}
                </select>
                <button className="ui primary button" onClick={this.loadClick.bind(this)}>Load</button>
                {this.props.onSceneRemove ? <button className="ui red button" onClick={this.removeClick.bind(this)}>Delete</button> : null}
            </div>);
    }
}