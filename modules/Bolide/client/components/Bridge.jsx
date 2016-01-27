import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';

@ReactMixin.decorate(ReactMeteorData)
export default class Bridge extends Component {
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
        username: ""
    };

    renderBridgeHeader() {
        return this.data.bridge ?
            <p>Bridge has ip <span className="ui label">{this.data.bridge.ip}</span> with username
                <span className="ui label">{this.data.bridge.username}</span></p> :
            <p>No current bridge</p>
    }

    clickSync() {
        Meteor.call('syncBridge', this.state.ip);
    }

    clickUpdate() {
        Meteor.call('updateBridge', this.state.ip, this.state.username);
    }

    handleIpChange(event) {
        this.setState({ip: event.target.value});
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    clickFindIp() {
        Meteor.call('findBridge', (error, result) => {
            if (!error) {
                this.setState({ip: result});
            }
        });
    }

    render() {
        return (
            <div className="ui text container segment">
                {this.renderBridgeHeader()}
                <div className="ui form">
                    <div className="field">
                        <label htmlFor="ip">ip</label>
                        <div className="ui fluid action input">
                            <input type="text"
                                   value={this.state.ip}
                                   name="ip"
                                   onChange={this.handleIpChange.bind(this)}/>
                            <div className="ui purple icon right attached button" onClick={this.clickFindIp.bind(this)}>
                                <i className="ui refresh icon"></i>uPNP
                            </div>
                        </div>
                    </div>
                    <div className="ui two column middle aligned relaxed grid" style={{position:'relative'}}>
                        <div className="column">
                            <div className="field">
                                <label htmlFor="username">username</label>
                                <input type="text"
                                       value={this.state.username}
                                       onChange={this.handleUsernameChange.bind(this)}
                                       name="username"/>
                            </div>
                            <button className="ui button" type="submit" onClick={this.clickUpdate.bind(this)}>Update
                                Bridge
                            </button>
                        </div>
                        <div className="ui vertical divider">
                            Or
                        </div>
                        <div className="center aligned column">
                            <div className="ui primary icon button" onClick={this.clickSync.bind(this)}>
                                <i className="ui wifi icon"></i>Sync
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};