Meteor.startup(function(){
    const randomState = new LightState('random', 2000);
    Meteor.setInterval(function(){
        randomState.setLight(1, {on: Math.random() > 0.5})
    }, 1000);
});