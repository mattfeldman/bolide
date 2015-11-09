PluginSettings = new Mongo.Collection('plugin_settings');
PluginSettings.allow({
    insert : function () {
        return true;
    },
    update : function () {
        return true;
    },
    remove : function () {
        return true;
    }
});

BolidePlugin = {list:[]};
BolidePlugin.register = function(name, component){
    BolidePlugin.list.push(new Plugin(name, component));
};

class Plugin{
    constructor(name, component){
        this.name = name;
        this.component = component;
    }
}
Meteor.methods({
    updateSetting(id, doc){
        check(id, String);
        check(doc, Object);
        PluginSettings.upsert({_id:id},doc);
    }
});