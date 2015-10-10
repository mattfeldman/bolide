Template['bridge'].helpers({
    bridge(){
        return Bridges.findOne("main");
    }
});
Template.bridge.events({
    'submit form'(event, target){
        event.preventDefault();
        const ip = target.$('input[name=ip]').val();
        const username = target.$('input[name=username]').val();
        Meteor.call('addBridge', ip, username);
    }
});
Template.bridge.onCreated(function(){
    this.subscribe('bridge');
});
