Meteor.methods({
    setLightOn(id, on) {
        if(!Meteor.isServer) return;
        check(id, String);
        check(on, Boolean);
        updateState("manual", id, {on: on});
    },
    setLightColor(id, r, g, b) {
        if(!Meteor.isServer) return;
        check(id, String);
        check(r, Number);
        check(g, Number);
        check(b, Number);
        updateState("manual", id, {rgb: {r,g,b}});
    },
    setLightBrightness(id, brightness){
        if(!Meteor.isServer) return;
        check(id, String);
        check(brightness, Number);
        updateState("manual", id, {bri: brightness});

    },
    setLightRandom(id){
        if(!Meteor.isServer) return;
        check(id, String);
        service.hue().setLightRandom(id);
    }
});