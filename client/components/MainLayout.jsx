MainLayout = React.createClass({
    render(){
        var mainStyle ={flex:1,marginTop:'2em',marginBottom:'1em'};
        return (
            <div id="main">
                <header>
                    <React.BlazeView template="header" />
                </header>
                <main style={mainStyle}>
                    <div className="ui page grid">
                        {this.props.content}
                    </div>
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        );
    }
});