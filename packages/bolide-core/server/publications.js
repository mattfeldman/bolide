Meteor.publish('pluginSettings', function(id){
    check(id, String);
    return PluginSettings.find({_id:id});
});

Meteor.publish('lights', function () {
    return Lights.find();
});

Meteor.publish('bridge', function () {
    return Bridges.find();
});

Meteor.publish('manualLightState', function () {
    return LightStates.find({_id:"manual"});
});

Meteor.publish('scenes', function () {
    return Scenes.find({});
});
