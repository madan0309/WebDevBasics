var repoFactory = function() {

    this.getRepo = function(repoType) {
        if(repoType == 'task') {
            var taskRepo = require('./taskRepo');
            return taskRepo();
        }
        if(repoType == 'user') {
            var userRepo = require('./userRepo');
            return userRepo();
        }
        if(repoType == 'project') {
            var projRepo = require('./projectRepo');
            return projRepo();
        }
    }
};

module.exports = new repoFactory;