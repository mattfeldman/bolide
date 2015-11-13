Bridge = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("bridge");
        const bridge = Bridges.findOne("main");
        return {
            bridge: bridge,
            loading: !subscription.ready()
        };
    },
    getInitialState(){
        return {ip: "", username:""};
    },
    renderBridgeHeader(){
        return this.data.bridge ?
            <p>Bridge has ip <span className="ui label">{this.data.bridge.ip}</span> with username <span className="ui label">{this.data.bridge.username}</span></p> :
            <p>No current bridge</p>
    },
    clickSync(){
        Meteor.call('syncBridge', this.state.ip);
    },
    clickUpdate(){
        Meteor.call('updateBridge', this.state.ip, this.state.username);
    },
    handleIpChange(event){
        this.setState({ip: event.target.value});
    },
    handleUsernameChange(event){
        this.setState({username: event.target.value});
    },
    render() {
        return (
            <div className="ui text container segment">
                {this.renderBridgeHeader()}
                <div className="ui form">
                    <div className="field">
                        <label for="ip">ip</label>
                        <input type="text" value={this.state.ip} name="ip" onChange={this.handleIpChange}/>
                    </div>
                    <div className="ui two column middle aligned relaxed grid" style={{position:'relative'}}>
                        <div className="column">
                            <div className="field">
                                <label for="username">username</label>
                                <input type="text" value={this.state.username} onChange={this.handleUsernameChange} name="username"/>
                            </div>
                            <button className="ui button" type="submit" onClick={this.clickUpdate}>Update Bridge</button>
                        </div>
                        <div className="ui vertical divider">
                            Or
                        </div>
                        <div className="center aligned column">
                            <div className="ui primary icon button" onClick={this.clickSync}><i className="ui wifi icon"></i>Sync</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});