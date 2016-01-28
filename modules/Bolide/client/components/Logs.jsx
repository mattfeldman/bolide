import ReactMixin from 'react-mixin';
import { Component, PropTypes } from 'react';
import {Table, Tr, Td} from 'reactable';

@ReactMixin.decorate(ReactMeteorData)
export default class Logs extends Component {
    state = {
        filter: ''
    };

    getMeteorData() {
        var subscription = Meteor.subscribe("logs");
        return {
            logs: Meteor.log.collection.find({}, {sort: {timestamp: -1}}).fetch(),
            loading: !subscription.ready()
        };
    }

    renderRow(log) {
        let singleLineStyle = {whiteSpace: 'nowrap'};
        return (
            <Tr key={log._id}>
                <Td column="level">{log.level}</Td>
                <Td column="category">{log.additional && log.additional.category}</Td>
                <Td column="module">{log.additional && log.additional.module}</Td>
                <Td column="message">{log.message}</Td>
                <Td column="time" style={singleLineStyle}>{moment(log.date).fromNow()}</Td>
            </Tr>
        );
    }

    renderTable() {
        return (
            <Table className="ui celled table">
                {this.data.logs.map(log => this.renderRow(log))}
            </Table>
        )
    }

    renderLoading() {
        return (
            <div className="ui active centered large inline loader">Loading...</div>
        );
    }

    render() {
        return (
            <div>
                <h1 className="ui header">Logs</h1>
                {this.data.loading ? this.renderLoading() : this.renderTable()}
            </div>
        );
    }
};