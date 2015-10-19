LightStates = new Mongo.Collection('lightStates');

LightState = class LightState{
    constructor(name, priority){
        this.stateId = name;
        LightStates.upsert({_id:name}, {$set:{priority: priority}});
    }
    setLight(lightId, state){
        let lightStates = LightStates.findOne({_id:this.stateId});
        if(lightStates) {
            if(!lightStates.lights) lightStates.lights = {};
            lightStates.lights[lightId] = _(lightStates.lights[lightId] || {}).extend(state);
            LightStates.upsert({_id:this.stateId}, {$set:{lights:lightStates.lights}});
        }
    }
    getLights (){
        let lightStates = LightStates.findOne({_id:this.stateId});
        return lightStates && lightStates.lights;
    }
    setLights(value){
        LightStates.upsert({_id:this.stateId}, {$set:{lights:value}});
    }
}

ManualState = class ManualState extends LightState {
    constructor() {
        super('manual', 1000);
    }
}