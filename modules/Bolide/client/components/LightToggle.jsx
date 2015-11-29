import { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class LightToggle extends Component {
    static propTypes = {
        value: React.PropTypes.bool.isRequired,
        onChange: React.PropTypes.func
    };

    render() {
        return (
            <div className={classNames('ui toggle checkbox', {'checked': this.props.value, 'disabled': this.props.value == null})}>
                <input type="checkbox" checked={this.props.value} onChange={this.props.onChange && this.props.onChange.bind(this)}/>
                <label>{{true: 'On', false: 'Off', null: 'Not Included'}[this.props.value]}</label>
            </div>
        );
    }
}