Meteor.publish('bridge', function () {
  return Bridges.find();
});

Meteor.publish('LightStates', function () {
  return LightStates.find();
});
