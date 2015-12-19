import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import classNames from 'classnames';

@ReactMixin.decorate(ReactMeteorData)
export default class BridgeConnectionStatus extends Component {
    getMeteorData() {
        var subscription = Meteor.subscribe("bridge");
        const bridge = Bridges.findOne("main");
        return {
            bridge: bridge,
            loading: !subscription.ready()
        };
    }
    state = {
        ip: "",
        username:""
    };
    render() {
        let iconStyle = classNames('ui inverted circular wifi icon', {
            'green' : !this.data.loading && this.data.bridge.connected,
            'red': !this.data.loading && !this.data.bridge.connected,
            'orange': this.data.loading
        });
        return (
            <div style={{float: "right"}}>
               <i className={iconStyle} />
            </div>
        );
    }
};