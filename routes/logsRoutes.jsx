FlowRouter.route("/logs", {
  action() {
    BlazeLayout.reset();
    ReactLayout.render(MainLayout, {
      content: <Logs />
    });
  }
});