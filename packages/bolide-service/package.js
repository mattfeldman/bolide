Package.describe({
    name: 'bolide:service',
    description: 'Exposes v1 background service',
    version: '0.0.1',
    git: ''
});

Package.onUse(function(api) {
    api.versionsFrom('1.0');

    api.use([
        'ecmascript',
        'bolide:log',
        'bolide:hue',
        'bolide:core',
        'bolide:schedule-runner',
    ]);

    api.addFiles('service.js');
    api.export('service', 'server');
    api.addFiles('state-manager.js', 'server');
});