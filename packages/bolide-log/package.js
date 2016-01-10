Package.describe({
    name: 'bolide:log',
    description: 'A local wrapper for logging in bolide',
    version: '0.0.1',
    git: ''
});

Package.onUse(function(api) {
    api.versionsFrom('1.0');

    api.use([
        'ecmascript',
        'underscore',
        'ostrio:logger',
        'ostrio:loggermongo'
    ]);

    api.addFiles('log.js');
    api.export('Meteor');
    api.export('BolideLog');
});