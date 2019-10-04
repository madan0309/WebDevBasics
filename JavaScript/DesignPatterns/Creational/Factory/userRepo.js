var userRepo = function() {
    db = {};

    var get = function(id) {
        console.log(`getting user #${id}`);
        return `#${id}`
    };

    var save = function(id) {
        console.log(`saving user #${id}`);
    };

    return {
        get: get,
        save: save
    }
};
module.exports = userRepo;