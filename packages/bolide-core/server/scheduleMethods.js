Meteor.methods({
    addSchedule(schedule){
        check(schedule, Object);
        console.log(schedule);
    }
});