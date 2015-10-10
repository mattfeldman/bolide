// Home Route
Router.route('/', {
  name: 'home',
  action() {
    this.render('home');
    SEO.set({ title: 'Home - ' + Meteor.App.NAME });
  }
});
