Lights = new Mongo.Collection('Lights');
/*
Lights.attachSchema(
    new SimpleSchema({
    title: {
      type: String
    },
    content: {
      type: String
    },
    createdAt: {
      type: Date,
      denyUpdate: true
    }
  })
);
*/
// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Lights.allow({
    insert : function () {
      return true;
    },
    update : function () {
      return true;
    },
    remove : function () {
      return true;
    }
  });
}
