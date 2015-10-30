Header = React.createClass({
    render(){
        return (
        <div className="ui center aligned header-wrapper">
            <h1 className="huge center aligned main ui header">
                Bolide
            </h1>
            <div className="ui page grid">
                <div className="ui inverted center labeled aligned secondary pointing menu">
                    <a href="lights" className="item"><i className="idea icon"></i> Lights</a>
                    <a href="bridge" className="item"><i className="wifi icon"></i>Bridges</a>
                    <a href="logs" className="item" ><i className="browser icon"></i> Logs</a>
                </div>
            </div>
        </div>);
    }
});