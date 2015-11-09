Meteor.publish('pluginSettings', function(id){
    check(id, String);
    return PluginSettings.find({_id:id});
});