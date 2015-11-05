Package.describe({
    name: 'bolide:rescue-time',
    description: 'A local package for bolide',
    version: '0.0.1',
    git: ''
});

Package.onUse(function(api) {
    api.versionsFrom('1.0');
    api.use([
        'ecmascript',
        'bolide:core',
        'bolide:log',
        'aramk:tinycolor',
        'react',
        'mongo'
    ]);
    api.addFiles('rescue-time.js','server');
    api.addFiles('RescueTime.jsx','client');
});