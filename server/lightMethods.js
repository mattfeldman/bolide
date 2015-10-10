Meteor.methods({
    setLightOn(id, on) {
        check(id, String);
        check(on, Boolean);
        if(hueService){
            hueService.setLightOn(id, on);
        }
    },
    setLightColor(id, r, g, b) {
        check(id, String);
        check(r, Number);
        check(g, Number);
        check(b, Number);
        if(hueService){
            hueService.setLightRandom(id);
        }
    },
    setLightBrightness(id, brightness){
        console.log(brightness);
        check(id, String);
        check(brightness, Number);
        if(hueService){
            hueService.setLightBrightness(id, brightness);
        }
    }
});