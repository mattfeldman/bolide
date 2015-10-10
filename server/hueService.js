hueService = {};
let interval;
function processBridge(bridge){
    hueService = {};
    if (!bridge) return;
    hueService = new Hue(bridge.ip, bridge.username);
    console.log(hueService.baseUrl);
    if(interval){
        Meteor.clearInterval(interval);
    }
    interval = Meteor.setInterval(function () {
        mapLights(hueService.getLights());
    }, 5000);
}
function mapLights(rawResponse){
    if(!rawResponse) return;
    for(let key of Object.keys(rawResponse)){
        const light = rawResponse[key];
        Lights.upsert(key, light);
    }
}
Meteor.startup(function() {
    Bridges.find({_id:"main"}).observe({
        added: processBridge,
        changed: processBridge
    });
});