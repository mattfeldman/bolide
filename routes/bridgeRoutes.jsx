FlowRouter.route('/bridge', {
  action(){
    ReactLayout.render(MainLayout, {
      content: <Bridge />
    });
  }
});