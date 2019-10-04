// This module is responsible for doing all the detabase calls

var repo = function() {
    // you will have all the db settings here
    var db = {};

    // just returning this.
    return {
        get: function(id) {
            console.log(`Getting task ${id}`);
            return {
                name: `new task from db`
            }
        },
        save: function(task) {
            console.log(`Saving the ${task.name} to the db`);
        }
    };
}

module.exports = repo();