/* { "path" : "packages/__namespace__-__packageName__/package.js" } */
Package.describe({
    name: '__namespace__:__packageName__',
    version: '0.0.1',
    git: ''
});

Package.onUse(function(api) {
    api.versionsFrom('1.0');

    api.use([
        'templating'
    ]);

    api.addFiles('__packageName__.js');
    api.export('__packageName__');
});

Package.onTest(function(api) {

});