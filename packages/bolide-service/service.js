service = {};
let hueService = {};
service.hue = function(){
  return hueService || false;
};
let interval;
function processBridge(bridge){
    hueService = {};
    if (!bridge) return;
    hueService = new Hue(bridge.ip, bridge.username);
    if(interval){
        Meteor.clearInterval(interval);
    }
    interval = Meteor.setInterval(function () {
        try {
            if(hueService && !hueService.error){
                mapLights(hueService.getLights());
            }

        }
        catch(e){
            Meteor.log.error(e);
        }
    }, 5000);
}
function mapLights(rawResponse){
    if(!rawResponse) return;
    for(let key of Object.keys(rawResponse)){
        const light = rawResponse[key];
        Lights.upsert(key, {$set:{raw:light}});
    }
}
Meteor.startup(function() {
    Bridges.find({_id:"main"}).observe({
        added: processBridge,
        changed: processBridge
    });
});