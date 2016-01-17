'use strict';
let usersImporter = require('./users-importer');

module.exports = {
    seedInitialData: function(shouldSeedData) {
        if (!shouldSeedData) {
            return;
        }

        usersImporter.importUsers()
            .then(function() {
                
            })
            .catch(function(err) {
                console.log(err);
            });
    }
};
