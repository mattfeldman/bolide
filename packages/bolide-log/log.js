Meteor.log.rule('Mongo',
{
    enable: true,
    filter: ['*'], /* Filters: 'ERROR', 'FATAL', 'WARN', 'DEBUG', 'INFO', '*' */
    client: true, /* This allows to call, but not execute on Client */
    server: true   /* Calls from client will be executed on Server */
});
if (Meteor.isServer) {
    Meteor.publish('logs',function(){
        return Meteor.log.collection.find();
    });
}
