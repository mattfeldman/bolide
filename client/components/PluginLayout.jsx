const {Link} = ReactRouter;
PluginLayout = React.createClass({
    render(){
        var mainStyle ={flex:1,marginTop:'2em',marginBottom:'1em'};
        return (
            <div id="main">
                <header>
                    <Header />
                </header>
                <main style={mainStyle}>
                    <div className="ui page grid">
                        <div className="four wide column">
                            <div className="ui vertical fluid left attached tabular menu">
                                {BolidePlugin.list.map(p=> <Link to={"/plugins/"+p.name} activeClassName="active" className="item">{p.name}</Link>)}
                            </div>
                        </div>
                        <div className="twelve wide stretched column">
                            <div className="ui segment">
                                {this.props.children ? this.props.children : <span>Select a plugin on the left</span>}
                            </div>
                        </div>
                    </div>
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        );
    }
});