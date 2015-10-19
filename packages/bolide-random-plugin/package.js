Package.describe({
    name: 'bolide:random-plugin',
    description: 'A local package for bolide',
    version: '0.0.1',
    git: ''
});

Package.onUse(function(api) {
    api.versionsFrom('1.0');

    api.use([
        'ecmascript'
    ]);

    api.addFiles('random-plugin.js');
    api.export('');
});