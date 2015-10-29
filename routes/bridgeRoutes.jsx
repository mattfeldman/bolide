FlowRouter.route('/bridge', {
  action(){
    BlazeLayout.reset();
    ReactLayout.render(MainLayout, {
      content: <Bridge />
    });
  }
});