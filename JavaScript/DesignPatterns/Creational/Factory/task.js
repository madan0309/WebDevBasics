'use strict'
// Create task constructor

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
        return `#${id}`
    };
}

module.exports = Task;
