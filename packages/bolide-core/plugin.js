BolidePlugin = {list:[]};
BolidePlugin.register = function(name, component){
    BolidePlugin.list.push(new Plugin(name, component));
};

class Plugin{
    constructor(name, component){
        this.name = name;
        this.component = component;
    }
}