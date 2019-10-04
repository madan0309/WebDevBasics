let projectRepo = function() {
    db = {};

    let get = function(id) {
        console.log(`getting project #${id}`);
        return `#${id}`
    };

    let save = function(id) {
        console.log(`saving project #${id}`);
    };
    
    return {
        get: get,
        save: save
    }
};
module.exports = projectRepo;