'use strict'
// Create task constructor

var Task = function(name) {
    this.name = name;
    this.completed = false;
}

Task.prototype.complete = function() {
    console.log("completing task: "+ this.name);
    this.completed = true;
};

Task.prototype.save = function() {
    console.log("saving Task: "+ this.name);
};


// Creating sub object with some more functionality/ Wrapping up existing code

var UrgentTask = function(name, priority) {
    Task.call(this, name);
    this.priority = priority;
}
// to copy prototype methods
UrgentTask.prototype = Object.create(Task.prototype);

UrgentTask.prototype.notify = function() {
    console.log("notifying important people");
}

UrgentTask.prototype.save = function() {
    this.notify();
    console.log("do special stuff before saving");
    Task.prototype.save.call(this);
}
var ut = new UrgentTask('This is urgent', 1);
console.log(ut);
ut.save();
ut.complete();