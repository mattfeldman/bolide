Meteor.startup(function(){
    var Cap = Npm.require('cap').Cap,
        decoders = Npm.require('cap').decoders,
        PROTOCOL = decoders.PROTOCOL;
    console.log("Starting Dash Plugin");
    var device = Cap.findDevice('192.168.1.100');
    let filter ='arp';
    let bufSize = 10 * 1024 * 1024;
    let buffer = new Buffer(65535);
    var c = new Cap();
    var linkType = c.open(device, filter, bufSize, buffer);
    c.setMinBytes && c.setMinBytes(0);
    seen = [];
    c.on('packet', Meteor.bindEnvironment(function(nbytes, trunc) {
        if (linkType === 'ETHERNET') {
            var ret = decoders.Ethernet(buffer);

            if(ret.info.srcmac == '74:c2:46:2b:75:9c') {
                Meteor.call('allOff');
            }
        }
    }));
});