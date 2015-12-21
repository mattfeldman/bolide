let SunCalc = Npm.require('suncalc');
Meteor.startup(function() {

    let lightState = new LightState("flux",4000);
    Meteor.setInterval(function(){
        try {
            const settings = PluginSettings.findOne("Flux");
            let {latitude, longitude} = settings.location;
            var times = SunCalc.getTimes(new Date(), latitude, longitude);
            let {sunrise, sunset} = times;
            settings.times = {sunrise, sunset};
            Meteor.call('updateSetting','Flux', settings);

        }
        catch(e){
            console.log(e);
        }
    }, 3000);
});