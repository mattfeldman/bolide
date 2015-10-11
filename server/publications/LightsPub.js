Meteor.publish('lights', function () {
  return Lights.find();
});

Meteor.publish('logs',function(){
  return Meteor.log.collection.find();
});