import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import SceneSelector from './SceneSelector';
import TimePicker from 'react-time-picker';


@ReactMixin.decorate(ReactMeteorData)
export default class SchedulePanel extends Component {
    getMeteorData() {
        var scenesSub = Meteor.subscribe('scenes');
        var schedulesSub = Meteor.subscribe('schedules');
        var scenes = Scenes.find();
        return {
            loaded: scenesSub.ready(),
            scenes: scenes.fetch()
        }

    }

    loadSceneClick(scene) {
        Meteor.call('applySceneById', scene._id);
    }

    render() {
        if (!this.data.loaded) {
            return <span>Loading...</span>
        }
        return (
            <div className="ui container">
                <h1 className="ui header">Scene</h1>
                <NewSchedule availableScenes={this.data.scenes}/>
            </div>
        );
    }
};

class NewSchedule extends Component {
    static propTypes = {
        sceneName: React.PropTypes.string,
        enabledDays: React.PropTypes.shape({
            sunday: React.PropTypes.bool,
            monday: React.PropTypes.bool,
            tuesday: React.PropTypes.bool,
            wednesday: React.PropTypes.bool,
            thursday: React.PropTypes.bool,
            friday: React.PropTypes.bool,
            saturday: React.PropTypes.bool
        }),
        time: React.PropTypes.string,
        availableScenes: React.PropTypes.array,
    };

    state = {
        enabledDays: {
            sunday: true,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: true
        },
        time: '00:00',
        selectedSceneId: null
    };

    daysChange(e){
        let enabledDays = this.state.enabledDays;
        enabledDays[e.target.value] = !enabledDays[e.target.value];
        this.setState({enabledDays: enabledDays});
    }

    timeChange(time){
        this.setState({time: time});
    }

    sceneChange(sceneId){
        this.setState({selectedSceneId: sceneId})
    }

    addSchedule(){
        Meteor.call('addSchedule', this.state.selectedSceneId, this.state.time, this.state.enabledDays);
    }

    render() {
        let self = this;
        return (
            <div className="ui four column equal width grid">
                <div className="column">
                    <div className="ui relaxed list">
                        {_.map(this.state.enabledDays, (enabled,day) =>
                        <div key={day} className="ui child checkbox item">
                            <input type="checkbox" name={day} checked={enabled} value={day} onChange={this.daysChange.bind(this)}/>
                            <label>{day}</label>
                        </div>
                            )}
                    </div>
                </div>
                <div className="column">
                    <TimePicker value={this.state.time} onChange={this.timeChange.bind(this)} />
                </div>
                <div className="column">
                    <SceneSelector scenes={this.props.availableScenes} onChange={this.sceneChange.bind(this)} />
                </div>
                <div className="column">
                    <div className="ui primary button" onClick={this.addSchedule.bind(this)}>Add Schedule</div>
                </div>
            </div>

        );
    }
}