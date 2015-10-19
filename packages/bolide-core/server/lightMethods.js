const manual = new ManualState();
Meteor.methods({
    setLightOn(id, on) {
        if(!Meteor.isServer) return;
        check(id, String);
        check(on, Boolean);
        manual.setLight(id, {on: on});
    },
    setLightColor(id, r, g, b) {
        if(!Meteor.isServer) return;
        check(id, String);
        check(r, Number);
        check(g, Number);
        check(b, Number);
        manual.setLight(id, {rgb: {r,g,b}});
    },
    setLightBrightness(id, brightness){
        if(!Meteor.isServer) return;
        check(id, String);
        check(brightness, Number);
        manual.setLight(id, {bri: brightness});

    },
    setLightRandom(id){
        if(!Meteor.isServer) return;
        check(id, String);
        manual.setLightRandom(id);
    }
});