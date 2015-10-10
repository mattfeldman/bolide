Template['light'].helpers({
});

Template.light.events({
    'change .checkbox'(event, target){
        event.preventDefault();
        const checked = target.$("input").is(":checked");
        Meteor.call('setLightOn', target.data._id, !!checked);
    },
    'click .random'(event, target){
        Meteor.call('setLightColor', target.data._id, 1,0,0);
    },
    'change #brightness'(event, target){
        event.preventDefault();
        let brightness = target.$("input#brightness").val();
        brightness = parseFloat(brightness);
        Meteor.call('setLightBrightness', target.data._id, brightness);
    },
});
