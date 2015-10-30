const manual = new ManualState();
Meteor.methods({
    setLightOn(id, on) {
        check(id, String);
        check(on, Boolean);
        manual.setLight(id, {on: on});
    },
    setLightColor(id, r, g, b) {
        check(id, String);
        check(r, Number);
        check(g, Number);
        check(b, Number);
        manual.setLight(id, {rgb: {r,g,b}});
    },
    setLightBrightness(id, brightness){
        check(id, String);
        check(brightness, Number);
        manual.setLight(id, {bri: brightness});
    },
    setLightRandom(id){
        if(!Meteor.isServer) return;
        check(id, String);
        manual.setLightRandom(id);
    },
    allOff(){
        if(!Meteor.isServer) return;
        manual.setAllOff();
    }
});