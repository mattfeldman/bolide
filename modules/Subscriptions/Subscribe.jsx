import {Component} from 'react';
import ReactMixin from 'react-mixin'

@ReactMixin.decorate(ReactMeteorData)
export default class Subscribe extends Component {
    getMeteorData() {
        let subs = _.map(this.props.subscriptions, (args, sub) => Meteor.subscribe(sub, args));
        return {loading: !_.every(subs, sub => sub.ready())};
    }

    render() {
        return <div>{this.data.loading ? "Loading" : this.props.children}</div>;
    }
}
