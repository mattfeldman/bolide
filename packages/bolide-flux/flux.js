let log = new BolideLog({category: "plugin", module:"Flux"});
Meteor.startup(function() {
    let lightState = new LightState("flux",4000);
    log.info("Plugin started");
    Meteor.setInterval(function(){
        try {
            Meteor.call('Flux.UpdateTimes');
        }
        catch(e){
            console.log(e);
            log.error("Resetting plugin data");
            PluginSettings.remove("Flux");
        }
    }, 900000);
});