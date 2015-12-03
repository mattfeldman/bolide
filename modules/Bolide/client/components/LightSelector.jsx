import { Component, PropTypes } from 'react';
export default class LightSelector extends Component {
    static propTypes = {
        lights: React.PropTypes.object.isRequired,
        onSelectionChange: React.PropTypes.func.isRequired,
    };

    componentDidMount() {
        let self = this;
        $(self.refs.lightSelectionRef).dropdown({
            onChange(value){
                self.props.onSelectionChange(value);
            }
        });
    }

    render() {
        return (
            <div className="ui labeled fluid input">
                <div className="ui label">Scene Lights</div>
                <select name="lights"
                        id="lightSelector"
                        ref="lightSelectionRef"
                        className="ui multiple fluid search selection dropdown"
                        multiple>
                    <option/>
                    {_.values(this.props.lights).map( light =>  <option key={light._id} value={light._id}>{light.raw.name}</option>)}
                </select>
            </div>);
    }
}