Package.describe({
    name: 'bolide:dash',
    description: 'A local package for bolide for interacting with amazon dash',
    version: '0.0.1',
    git: ''
});

Npm.depends({
    'cap':'0.1.0'
});

Package.onUse(function(api) {
    api.versionsFrom('1.0');

    api.use([
        'bolide:core',
        'bolide:service',
        'bolide:log',
        'ecmascript',
        'react'
    ]);

    api.addFiles('dash.js', 'server');
    api.addFiles('dash.jsx','client');
    api.export('');
});