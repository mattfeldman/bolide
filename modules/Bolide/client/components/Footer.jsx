import { Component, PropTypes } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <div className="ui inverted center aligned padding-wrapper footer segment">
                <a href="https://github.com/mattfeldman/bolide"><i className="github icon"></i> Bolide</a> by
                <a href="https://github.com/mattfeldman">Matt Feldman</a>
            </div>
        );
    }
};