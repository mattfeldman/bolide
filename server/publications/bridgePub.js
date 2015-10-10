Meteor.publish('bridge', function () {
  return Bridges.find();
});
