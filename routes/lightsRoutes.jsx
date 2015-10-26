FlowRouter.route('/lights', {
  action(){
    BlazeLayout.reset();
    ReactLayout.render(MainLayout, {
      content: <LightPanel />
    });
  }
});