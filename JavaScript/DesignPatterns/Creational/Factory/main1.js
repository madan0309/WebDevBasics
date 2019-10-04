let repoFactory = require('./repoFactory1');
let Task = require('./task');

console.log(repoFactory);
let task1 = new Task(repoFactory.getRepo('task').get(1));
let user1 = repoFactory.getRepo('user').get(1);
let proj1 = repoFactory.getRepo('project').get(1);

task1.user = user1;
task1.project = proj1;
task1.save();