let log = new BolideLog({category: "plugin", module:"Flux"});
Meteor.methods({
    'Flux.UpdateTimes'(){
        if(Meteor.isServer) {
            let SunCalc = Npm.require('suncalc');
            const settings = PluginSettings.findOne("Flux");
            if (!settings) {
                log.info("Not configured.");
                return;
            }
            let {latitude, longitude} = settings.location;
            var times = SunCalc.getTimes(new Date(), latitude, longitude);
            let {sunrise, sunset} = times;
            settings.times = {sunrise, sunset};
            Meteor.call('updateSetting', 'Flux', settings);
        }
        log.info("Updated Times");
    }
});