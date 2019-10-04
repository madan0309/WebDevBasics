'use strict'
class Task {
    constructor(title, description) {
        this.title = title,
        this.description = description
    };
}



Task.toString = "Hello";

let task = new Task('My Task', 'This is my task');
let task2 = new Task('My Task2', 'This is my task2');

Object.defineProperty(Task.prototype, 'toString', {
    value: function() {
        return this.title + ' ' + this.description;
    },
    writable : false,
    enumerable : true,
    configurable : true
});

console.log(task.toString());
console.log(task2.toString());