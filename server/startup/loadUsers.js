function loadUser(user) {
  var userAlreadyExists = typeof Meteor.users.findOne({ username : user.username }) === 'object';

  if (!userAlreadyExists) {
    Accounts.createUser(user);
  }
}
Meteor.log.rule('Mongo',
    {
      enable: true,
      filter: ['*'], /* Filters: 'ERROR', 'FATAL', 'WARN', 'DEBUG', 'INFO', '*' */
      client: true, /* This allows to call, but not execute on Client */
      server: true   /* Calls from client will be executed on Server */
    });
Meteor.startup(function () {
  var users = YAML.eval(Assets.getText('users.yml'));

  for (key in users) if (users.hasOwnProperty(key)) {
    Meteor.log.info(`Loading ${key}`);
    loadUser(users[key]);
  }
});