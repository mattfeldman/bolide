let log = new BolideLog({category: "plugin", module:"rescuetime"});
Meteor.startup(function() {
    log.info("Started");
    let lightState = new LightState("rescue-time",3000);
    Meteor.setInterval(function(){
        try {
            const settings = PluginSettings.findOne("rescueTime");
            if(!settings || !settings.key) return;
            if(!settings.enabled){
                lightState.clearState(settings.light);
                return;
            }
            const reqString = "https://www.rescuetime.com/anapi/data?key="+settings.key+"&perspective=interval&rs=day&restrict_kind=efficiency&format=json";
            const data = HTTP.get(reqString);
            const prodPercent = data.data.rows[0][4];
            const color = tinycolor.mix("#F00", "#00F", prodPercent);
            log.info(`Productivity ${prodPercent*100} resulting in ${color.toRgbString()}`);
            const {r,g,b} = color.toRgb();
            lightState.setLight(settings.light, {rgb: {r, g, b}});
        }
        catch(e){
            log.info(`Error ${e.ToString()}`);

        }
    }, 15000);
});