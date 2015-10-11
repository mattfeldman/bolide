// Home Route
Router.route('/', {
  name: 'home',
  action() {
    this.render('lights');
  }
});
