Package.describe({
    name: 'bolide:core',
    description: 'Core package for bolide',
    version: '0.0.1',
    git: ''
});

Package.onUse(function(api) {
    api.versionsFrom('1.0');

    api.use([
        'mongo',
        'check',
        'aldeed:simple-schema',
        'dburles:collection-helpers',
        'ecmascript',
        'bolide:hue',
        'jagi:astronomy@1.2.4',
    ]);
    api.addFiles('plugin.js');

    api.addFiles('models/Bridges.js');
    api.addFiles('models/Lights.js');
    api.addFiles('models/LightStates.js');
    api.addFiles('models/Scenes.js');
    api.addFiles('models/Schedules.js');

    api.addFiles('server/bridgeMethods.js');
    api.addFiles('server/lightMethods.js');
    api.addFiles('server/sceneMethods.js');
    api.addFiles('server/scheduleMethods.js');
    api.addFiles('server/publications.js', 'server');

    api.export([
        'Bridges',
        'Lights',
        'LightStates',
        'Scenes',
        'Schedules',
        'LightState',
        'ManualState',
        'BolidePlugin',
        'PluginSettings'
    ]);
});