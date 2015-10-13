let lastStates = {};
Meteor.startup(function(){
    // {id, state}
    LightStates.find({}).observe({added:manageState, changed:manageState, removed:manageState});
});
function manageState(){
    const states = LightStates.find({},{$sort:{priority:-1}}).fetch();
    // get current state
    var newState = {};
    _(states).each((state)=>{
        if(!state) return;
        _(state.lights).map((state, id)=>{
            if(!id || !state) return;
            lightState = newState[id] || {};
            newState[id] = _(lightState).extend(state);
        });
    });
    _(newState).map((state,id)=>{
        const lastState = lastStates[id];
        const reqState = _(state).clone();
        if(lastState) {
            _(lastState).keys().forEach(key=> {
                if (lastState[key] !== undefined && (lastState[key] === state[key] || _.isEqual(lastState[key], state[key]))) {
                    delete reqState[key];
                }
            });
        }
        if(Object.keys(reqState).length !== 0) {
            console.log(reqState);
            service.hue().setLightState(id, reqState);
        }
    });
    lastStates = newState;
}