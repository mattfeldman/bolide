Meteor.publish('bridge', function () {
  return Bridges.find();
});

Meteor.publish('manualLightState', function () {
  return LightStates.find({_id:"manual"});
});
