'use strict';
let express = require('express'),
    usersController = require('./../../controllers/users-controller'),
    identity = require('./../../common/identity');

module.exports = function(app) {
    let router = express.Router();

    router
        .get('/:id', identity.requiresAuthentication(), usersController.getById)
        .post('/', usersController.createUser)
        .put('/token', usersController.loginUser);

    app.use('/api/users', router);
};
