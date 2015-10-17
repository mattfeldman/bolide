Template.light.events({
    'change .checkbox'(event, target){
        event.preventDefault();
        const checked = target.$("input").is(":checked");
        Meteor.call('setLightOn', target.data._id, !!checked);
    },
    'click .random'(event, target){
        Meteor.call('setLightRandom', target.data._id);
    },
    'change #brightness'(event, target){
        event.preventDefault();
        let brightness = target.$("input#brightness").val();
        brightness = parseFloat(brightness);
        Meteor.call('setLightBrightness', target.data._id, brightness);
    }
});

Template.light.onRendered(function(){
    var self=this;
    const state = getManualState(this.data._id);
    const throttledLightUpdate = _.throttle(function(){
        const {r,g,b} = self.$('.color').spectrum('get').toRgb();
        Meteor.call('setLightColor', self.data._id, r,g,b);
    }, 500);
    let options = {move: throttledLightUpdate};
    if(state && state.rgb){
        const {r,g,b} = state.rgb;
        options.color = `rgb(${r},${g},${b})}`;
    }
    this.$(".color").spectrum(options);
});

Template.light.helpers({
    bri(){
        const state = getManualState(this._id);
        return state && state.bri || 0;
    },
    colorString(){
        const state = getManualState(this._id);
        if(!state || !state.rgb) return;
        const {r,g,b} = state.rgb;
        return `rgb(${r},${g},${b})}`;
    },
    toggledOn(){
        const state = getManualState(this._id);
        return state && state.on || false;
    }
});
function getManualState(id){
    var lightState = LightStates.findOne("manual");
    return lightState && lightState.lights && lightState.lights[id];
}
