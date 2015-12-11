import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import Scene from './Scene';

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
                <div>
                    {this.data.scenes.map(scene => <Scene key={scene._id} scene={scene} onClick={this.loadSceneClick}/>)}
                </div>
            </div>
        );
    }
};