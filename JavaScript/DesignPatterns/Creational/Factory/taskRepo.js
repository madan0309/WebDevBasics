let taskRepo = function() {
    db = {};

    get = function(id) {
        console.log(`getting task #${id}`);
        return `#${id}`
    };

    save = function(id) {
        console.log(`saving task #${id}`);
        return `#${id}`
    };
    
    return {
        get: get,
        save: save
    }
}
module.exports = taskRepo;