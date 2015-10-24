MainLayout = React.createClass({
    render(){
        var mainStyle ={flex:1,'margin-top':'2em','margin-bottom':'1em'};
        return (
            <div id="main">
                <header>
                    <React.BlazeView template="header" />
                </header>
                <main style={mainStyle}>
                    <div class="ui page grid">
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