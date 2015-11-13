Bridges = new Mongo.Collection('Bridges');

/*Bridges.attachSchema(new SimpleSchema({
        _id:{
            type: String
        },
        ip: {
            type: String
        },
        username: {
            type: String
        },
        connected: {
            type: Boolean
        }
    })
);*/

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    Bridges.allow({
        insert: function () {
            return true;
        },
        update: function () {
            return true;
        },
        remove: function () {
            return true;
        }
    });
}