Meteor.methods({
    updateBridge(ip, username){
        check(ip, String);
        check(username, String);
        Bridges.upsert({_id:"main"},{$set:{ip:ip, username:username, connected:false}});
    },
    findBridge(){
        if(!Meteor.isServer) return;
        const response = HTTP.get("https://www.meethue.com/api/nupnp");
        let ip = response.data[0].internalipaddress;
        return ip;
    },
    syncBridge(ip){
        check(ip, String);
        if(!Meteor.isServer || !ip) return;
        const response = HTTP.post('http://'+ip+'/api', {data:{devicetype: "bolide"}});
        const data = response.data[0];
        if(data) {
            if(data.error){
                return data.error.description;
            }
            else if(data.success){
                Bridges.upsert({_id:"main"},{$set:{ip:ip, username:data.success.username, connected:true}});
            }
        }
    }
});