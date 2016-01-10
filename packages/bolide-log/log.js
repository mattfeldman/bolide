Meteor.log.rule('Mongo',
{
    enable: true,
    filter: ['*'], /* Filters: 'ERROR', 'FATAL', 'WARN', 'DEBUG', 'INFO', '*' */
    client: true, /* This allows to call, but not execute on Client */
    server: true   /* Calls from client will be executed on Server */
});
if (Meteor.isServer) {
    Meteor.publish('logs',function(){
        return Meteor.log.collection.find({}, {limit: 200, sort: {timestamp: -1}});
    });
}

BolideLog = class BolideLog {
    constructor(options){
        this.category = options.category || "default";
        this.module = options.module || "global";
    }
    info(msg, data){
        this._call(Meteor.log.info, msg, data);
    }
    debug(msg, data){
        this._call(Meteor.log.debug, msg, data);
    }
    warning(msg, data){
        this._call(Meteor.log.warn, msg, data);
    }
    error(msg, data){
        this._call(Meteor.log.error, msg, data);
    }
    _call(fn, msg, data) {
        console.log(msg);
        data = _.defaults(data || {}, {category: this.category, module: this.module});
        fn.call(Meteor.log, msg, data);
    }
};
