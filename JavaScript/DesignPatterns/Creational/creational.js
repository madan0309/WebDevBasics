'use strict'
// Create task constructor
var Repo = require('./module.js');


class Task {
    constructor(data) {
        this.name = data.name;
        this.completed = false;
    };
    complete() {
        console.log(`completing the task: ${this.name}`);
        this.completed = true;
    };
    
    save() {
        console.log(`Saving Task: ${this.name}`);
        Repo.save(this);
    };
}

module.exports = Task;
