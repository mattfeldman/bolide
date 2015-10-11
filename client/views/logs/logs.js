Template.logs.onCreated(function(){
    this.subscribe("logs");
});

Template.logs.helpers({
    logs(){
        return Meteor.log.collection.find({},{sort:{timestamp:-1}});
    },
    timeFrom(date){
        return moment(date).fromNow();
    }
});