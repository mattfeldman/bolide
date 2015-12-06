Meteor.methods({
    addSchedule(sceneId, time, enabledDays){
        let schedule = new Schedule();
        schedule.set({
            sceneId: sceneId,
            enabledDays: enabledDays,
            time: time
        });
        schedule.save();
    },
    removeSchedule(scheduleId){
        check(scheduleId, String);
        Schedules.findOne(scheduleId).remove();
    }
});