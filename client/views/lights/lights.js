Template.lights.onCreated(function(){
    this.subscribe('lights');
    this.subscribe('manualLightState');
});
Template.lights.helpers({
    lights(){
        return Lights.find();
    },
    count(){
        return Lights.find().count();
    }
});
Template.lights.events({
    'click .off'(){
        Meteor.call('allOff');
    }
});