FlowRouter.route('/', {
  action(){
    BlazeLayout.render("basicLayout", {area: "lights"});
  }
});