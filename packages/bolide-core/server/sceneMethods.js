Meteor.methods({
    setScene(name, substate, id = null){
        check(name, String);
        check(substate, Object);

        // remove empty properties
        for(var light in substate){
            for (var prop in substate[light]){
                if( substate[light].hasOwnProperty(prop) && (substate[light][prop] === undefined || substate[light][prop] === null)) {
                    delete substate[light][prop];
                }
            }
        }

        Scenes.upsert({_id: id}, {name: name, substate: substate});
    },
    removeScene(id){
        check(id, String);
        Scenes.remove({_id: id});
    }
});