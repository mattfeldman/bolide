const {Link} = ReactRouter;
Header = React.createClass({
    render(){
        return (
        <div className="ui center aligned header-wrapper">
            <h1 className="huge center aligned main ui header">
                Bolide
            </h1>
            <div className="ui page grid">
                <div className="ui inverted center labeled aligned secondary pointing menu">
                    <Link to="/lights" activeClassName="active" className="item"><i className="idea icon"></i> Lights</Link>
                    <Link to="/bridge" activeClassName="active" className="item"><i className="wifi icon"></i> Bridges</Link>
                    <Link to="/logs" activeClassName="active" className="item"><i className="browser icon"></i> Logs</Link>
                </div>
            </div>
        </div>);
    }
});