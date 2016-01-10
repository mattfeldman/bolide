let SunCalc = Npm.require('suncalc');
let log = new BolideLog({category: "plugin", module:"Flux"});
Meteor.startup(function() {
    let lightState = new LightState("flux",4000);
    log.info("Plugin started");
    Meteor.setInterval(function(){
        try {
            const settings = PluginSettings.findOne("Flux");
            if(!settings){
                log.info("Not configured.");
            }
            let {latitude, longitude} = settings.location;
            var times = SunCalc.getTimes(new Date(), latitude, longitude);
            let {sunrise, sunset} = times;
            settings.times = {sunrise, sunset};
            Meteor.call('updateSetting','Flux', settings);
            log.info("Updated Times");
        }
        catch(e){
            console.log(e);
            log.error("Resetting plugin data");
            PluginSettings.remove("Flux");
        }
    }, 90000);
});