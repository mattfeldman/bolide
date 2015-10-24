Logs = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("logs");
        return {
            logs: Meteor.log.collection.find({}, {sort: {timestamp: -1}}).fetch(),
            loading: !subscription.ready()
        };
    },
    renderRow(log){
        let singleLineStyle = {'white-space': 'nowrap'};
        return(
        <tr>
            <td>{log.level}</td>
            <td>{log.message}</td>
            <td style={singleLineStyle}>{moment(log.date).fromNow()}</td>
        </tr>
        );
    },
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
    },
    renderLoading(){
        return (
            <div class="ui active centered large inline loader">Loading...</div>
        );
    },
    render() {
        return (
            <div>
                <h1 class="ui header">Logs</h1>
                {this.data.loading ? this.renderLoading() : this.renderTable()}
            </div>
        );
    }
});