Template.logs.onCreated(function(){
    this.subscribe("logs");
});

Template.logs.helpers({
    logs(){
        return Meteor.log.collection.find({});
    },
    timeFrom(date){
        return moment(date).fromNow();
    }
});