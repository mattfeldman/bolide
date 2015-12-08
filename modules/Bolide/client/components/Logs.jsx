import ReactMixin from 'react-mixin';
import { Component, PropTypes } from 'react';

@ReactMixin.decorate(ReactMeteorData)
export default class Logs extends Component {
    getMeteorData() {
        var subscription = Meteor.subscribe("logs");
        return {
            logs: Meteor.log.collection.find({}, {sort: {timestamp: -1}}).fetch(),
            loading: !subscription.ready()
        };
    }
    renderRow(log){
        let singleLineStyle = {whiteSpace: 'nowrap'};
        return(
            <tr key={log._id}>
                <td>{log.level}</td>
                <td>{log.message}</td>
                <td style={singleLineStyle}>{moment(log.date).fromNow()}</td>
            </tr>
        );
    }
    renderTable(){
        return (
            <table className="ui celled table">
                <thead>
                <tr>
                    <th>Level</th>
                    <th>Message</th>
                    <th>Time</th>
                </tr>
                </thead>
                <tbody>
                {this.data.logs.map(log => this.renderRow(log))}
                </tbody>
            </table>
        )
    }
    renderLoading(){
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