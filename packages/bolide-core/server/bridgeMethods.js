Meteor.methods({
    addBridge(ip, username){
        console.log(ip);
        console.log(username);
        check(ip, String);
        check(username, String);
        Bridges.upsert({_id:"main"},{$set:{ip:ip, username:username, connected:false}});
    }
});