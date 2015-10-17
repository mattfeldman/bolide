LightStates = new Mongo.Collection('lightStates');

LightStates.upsert({_id:"manual"}, {$set:{priority: 1000}});
updateState = function(stateManagerId, lightId, state){
    let lightStates = LightStates.findOne({_id:stateManagerId});
    if(lightStates) {
        if(!lightStates.lights) lightStates.lights = {};
        lightStates.lights[lightId] = _(lightStates.lights[lightId] || {}).extend(state);
        LightStates.upsert({_id:stateManagerId}, {$set:{lights:lightStates.lights}});
    }
}
