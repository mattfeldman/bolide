Package.describe({
    name: 'bolide:hue',
    description: 'Hue interaction library for bolide',
    version: '0.0.1',
    git: ''
});

Package.onUse(function(api) {
    api.versionsFrom('1.0');
    api.use(['ecmascript', 'bolide:log']);
    api.addFiles('hue.js');
    api.export('Hue', 'server');
});