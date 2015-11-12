Meteor.startup(function() {
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
            const {r,g,b} = color.toRgb();
            lightState.setLight(settings.light, {rgb: {r, g, b}});
        }
        catch(e){
            console.log(e);
            // nada
        }
    }, 15000);
});