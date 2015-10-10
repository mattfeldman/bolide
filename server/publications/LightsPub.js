Meteor.publish('lights', function () {
  return Lights.find();
});
