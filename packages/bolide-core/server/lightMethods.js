Meteor.methods({
    setLightOn(id, on) {
        if(!Meteor.isServer) return;
        check(id, String);
        check(on, Boolean);

        if(service.hue()){
            // service.hue().setLightOn(id, on);
            updateState("main", id, {on: on});
        }
    },
    setLightColor(id, r, g, b) {
        if(!Meteor.isServer) return;
        check(id, String);
        check(r, Number);
        check(g, Number);
        check(b, Number);
        if(service.hue()){
            const rgb = {r,g,b};
            const colorString = `rgb(${r},${g},${b})`;
            var light = Lights.update({_id:id},{$set:{rgb:rgb, colorString:colorString}});

            //service.hue().setLightColor(id, r, g, b);
            updateState("main", id, {rgb: {r,g,b}});
        }
    },
    setLightBrightness(id, brightness){
        if(!Meteor.isServer) return;
        check(id, String);
        check(brightness, Number);
        if(service.hue()){
           // service.hue().setLightBrightness(id, brightness);
            updateState("main", id, {bri: brightness});
        }
    },
    setLightRandom(id){
        if(!Meteor.isServer) return;
        check(id, String);
        if(service.hue()){
            service.hue().setLightRandom(id);
        }
    }
});