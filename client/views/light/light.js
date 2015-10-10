Template['light'].helpers({
});

Template.light.events({
    'change'(event, target){
        event.preventDefault();
        const checked = target.$("input").is(":checked");
        Meteor.call('setLightOn', target.data._id, !!checked);
    },
    'click .random'(event, target){
        Meteor.call('setLightColor', target.data._id, 1,0,0);
    }
});
