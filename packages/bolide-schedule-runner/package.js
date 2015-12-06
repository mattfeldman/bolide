Package.describe({
    name: 'bolide:schedule-runner',
    description: 'Runs bolide schedules',
    version: '0.0.1',
    git: ''
});

Package.onUse(function(api) {
    api.versionsFrom('1.0');

    api.use([
        'bolide:core',
        'percolate:synced-cron'
    ]);

    api.addFiles('service.js', 'server');
});