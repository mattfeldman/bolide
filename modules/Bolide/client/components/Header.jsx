import { Component, PropTypes } from 'react';
import {Link} from 'react-router';

require("../stylesheets/header.less");
export default class Header extends Component {
    render() {
        return (
            <div className="ui center aligned header-wrapper">
                <h1 className="huge center aligned main ui header">
                    Bolide
                </h1>
                <div className="ui page grid">
                    <div className="ui inverted center labeled aligned secondary pointing menu">
                        <Link to="/lights" activeClassName="active" className="item"><i className="idea icon"></i>
                            Lights</Link>
                        <Link to="/scene_select"
                              activeClassName="active"
                              className="item"><i className="desktop icon"></i> Scenes</Link>
                        <Link to="/scenes" activeClassName="active" className="item"><i className="camera icon"></i>Edit
                            Scenes</Link>
                        <Link to="/bridge" activeClassName="active" className="item"><i className="wifi icon"></i>
                            Bridges</Link>
                        <Link to="/logs" activeClassName="active" className="item"><i className="browser icon"></i> Logs</Link>
                        <Link to="/schedule" activeClassName="active" className="item"><i className="calendar icon"></i>
                            Schedule</Link>
                        <Link to="/plugins" activeClassName="active" className="item"><i className="puzzle icon"></i>
                            Plugins</Link>
                        <Link to="/debug" activeClassName="active" className="item"><i className="bug icon"></i>
                            Debug</Link>
                    </div>
                </div>
            </div>);
    }
};