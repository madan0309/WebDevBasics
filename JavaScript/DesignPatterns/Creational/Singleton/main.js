let TaskRepo = (function() {
    let taskRepo;
    function createRepo() {
        taskRepo = new Object("Task");
        return taskRepo;
    }
    return {
        getInstance: function() {
            if(!taskRepo) {
                taskRepo = createRepo();
            } 
            return taskRepo;
        }
    }
})();

let repo1 = TaskRepo.getInstance();
let repo2 = TaskRepo.getInstance();
let repo3 = TaskRepo.getInstance();
if(repo1 === repo2) {
    console.log("They are Same");
}
if(repo1 === repo3) {
    console.log("They are Same");
}