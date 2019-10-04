let Task = require('./task');
let taskRepo = require('./taskRepo')();
let userRepo = require('./userRepo')();
let projectRepo = require('./projectRepo')();

let task1 = new Task({'name': 'My New Task'});

let user = userRepo.get(1);
let proj = projectRepo.get(1);


task1.user = user;
task1.project = proj;

console.log(task1);
task1.save();
