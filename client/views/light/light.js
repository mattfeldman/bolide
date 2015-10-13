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
    const throttledLightUpdate = _.throttle(function(){
        const {r,g,b} = self.$('.color').spectrum('get').toRgb();
        Meteor.call('setLightColor', self.data._id, r,g,b);
    }, 500);
    let options = {move: throttledLightUpdate};
    if(self.data.rgb){
        options.color = self.data.colorString;
    }
    this.$(".color").spectrum(options);
});
