Meteor.publish('pluginSettings', function(key){
    return PluginSettings.find({_id:key});
});