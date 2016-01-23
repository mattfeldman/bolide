Package.describe({
    name: 'bolide:flux',
    description: 'A F.lux like package for triggering scenes in bolide',
    version: '0.0.1',
    git: ''
});

Npm.depends({
    'suncalc': '1.7.0'
});

Package.onUse(function(api) {
    api.versionsFrom('1.0');
    api.use([
        'ecmascript',
        'bolide:core',
        'bolide:log',
        'react',
        'mongo'
    ]);
    api.addFiles('methods.js');
    api.addFiles('flux.js','server');
});