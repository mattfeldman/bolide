FlowRouter.route('/lights', {
  action(){
    BlazeLayout.render("basicLayout", {area: "lights"});
  }
});