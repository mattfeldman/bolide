import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';

@ReactMixin.decorate(ReactMeteorData)
export default class SceneSelectPanel extends Component {
    getMeteorData(){
        var scenesSub = Meteor.subscribe('scenes');
        var scenes = Scenes.find();
        return{
            loaded: scenesSub.ready(),
            scenes: scenes.fetch()
        }

    }

    loadSceneClick(scene){
        Meteor.call('applySceneById', scene._id);
    }

    render(){
        if (!this.data.loaded){
            return <span>Loading...</span>
        }
        return(
            <div className="ui container">
                <h1 className="ui header">Scene</h1>
                <div className="ui buttons">
                    {this.data.scenes.map(scene => <div className="ui button" onClick={this.loadSceneClick.bind(this, scene)}>{scene.name}</div>)}
                </div>
            </div>
        );
    }
};

class Schedule extends Component {
    static propTypes = {
        SceneName: React.PropTypes.string,
        EnabledDays: React.PropTypes.shape({
            sunday: React.PropTypes.bool,
            monday: React.PropTypes.bool,
            tuesday: React.PropTypes.bool,
            wednesday: React.PropTypes.bool,
            thursday: React.PropTypes.bool,
            friday: React.PropTypes.bool,
            saturday: React.PropTypes.bool
        }),
        Time: React.PropTypes.string
    }
}