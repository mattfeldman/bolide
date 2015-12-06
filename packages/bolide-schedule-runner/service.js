Meteor.startup(function() {
    Schedules.find({}).observe({
        added: addSchedule,
        changed: changeSchedule,
        removed: removeSchedule
    });
    SyncedCron.start();
});

function addSchedule(doc){
    SyncedCron.add({
        name: doc._id,
        schedule: function(parser){
            return parser.recur().on(doc.time).time().on(doc.dayNumerals).dayOfWeek();
        },
        job: function(){
            Meteor.call('applySceneById', doc.sceneId);
        }
    });
}

function removeSchedule(doc){
    SyncedCron.remove(doc._id);
}

function changeSchedule(doc){
    removeSchedule(doc);
    addSchedule(doc);
}