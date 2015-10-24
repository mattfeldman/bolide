Template.logs.helpers({
    timeFrom(date){
        return moment(date).fromNow();
    },
    logsComponent(){
        return Logs;
    }
});