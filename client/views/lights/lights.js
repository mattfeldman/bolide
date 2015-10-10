Template.lights.onCreated(function(){
    this.subscribe('lights');
});
Template.lights.helpers({
    lights(){
        return Lights.find();
    },
    count(){
        return Lights.find().count();
    }
});