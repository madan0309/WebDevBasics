let repoFactory = function() {
    let repos = this;
    let repoList = [
        {name: 'task', source: './taskRepo'},
        {name: 'project', source: './projectRepo'},
        {name: 'user', source: './userRepo'}
    ];

    repoList.forEach(function(repo) {
        repos[repo.name] = require(repo.source)();
    })
}
module.exports = new repoFactory;