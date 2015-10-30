Package.describe({
    name: 'bolide:dependencies',
    description: 'A local package for bolide',
    version: '0.0.1',
    git: ''
});
Npm.depends({
    "react-color": "1.1.1",
    "externalify": "0.1.0"
});
Package.onUse(function(api) {
    api.versionsFrom('1.0');

    api.use([
        'ecmascript',
        'cosmos:browserify'
    ]);
    api.addFiles('app.browserify.options.json','client');
    api.addFiles('app.browserify.js','client');
    api.export(['ColorPicker'],'client');
});