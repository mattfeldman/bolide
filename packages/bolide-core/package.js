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
        'bolide:hue'
    ]);

    api.addFiles('models/Bridges.js');
    api.addFiles('models/Lights.js');
    api.addFiles('models/LightStates.js');

    api.addFiles('server/bridgeMethods.js');
    api.addFiles('server/lightMethods.js');

    api.export(['Bridges', 'Lights', 'LightStates']);
});