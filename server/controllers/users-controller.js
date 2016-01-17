'use strict';
let User = require('mongoose').model('User'),
  encryption = require('./../common/encryption'),
  identity = require('./../common/identity'),
  mapper = require('./../common/mapper'),
  constants = require('./../common/constants');

module.exports = {
  restoreShoppingLists: function(req, res, next) {
    let user = req.user;
    console.log('here');

    User.findOne({
      _id: user._id
    }, function(err, dbUser) {
      if (err) {
        next(err.message);
        return;
      }

      res.json(dbUser.shoppingLists);
    });
  },
  backupShoppingLists: function(req, res, next) {
    let user = req.user;

    User.findOne({
      _id: user._id
    }, function(err, dbUser) {
      if (err) {
        next(err.message);
        return;
      }

      let shoppingLists = req.body;

      dbUser.shoppingLists = shoppingLists;
      dbUser.save(function(err) {
        if (err) {
          res.send('');
          return;
        }

        res.send(true);
      });
    });
  },
  createUser: function(req, res) {
    let modelValidator = require('./../common/model-validator'),
      user = req.body;

    if (!modelValidator.isUserRequestModelValid(user)) {
      res.status(400)
        .json({
          message: 'Invalid user!'
        });

      return;
    }

    user.password = encryption.createHash(user.password);

    User.create(user, function(err, data) {
      if (err) {
        res.status(400)
          .json({
            message: 'Invalid registration information.'
          });

        return;
      }

      res.status(201)
        .json(data);
    });
  },
  getById: function(req, res, next) {
    let user = req.user,
      isAdmin = identity.isAuthorizedForRole(user, constants.ADMIN_ROLE),
      isModerator = identity.isAuthorizedForRole(user, constants.MODERATOR_ROLE);

    if ((user._id != req.params.id) && (!isAdmin && !isModerator)) {
      res.status(401)
        .json({
          message: 'Your are not authorized to get this information!'
        });

      return;
    }

    User.findOne({
      _id: req.params.id
    }, function(err, data) {
      if (err) {
        next(err.message);
        return;
      }

      res.json(mapper.mapToUserResponseModel(data));
    });
  },
  loginUser: function(req, res, next) {
    let userName = req.body.userName,
      password = req.body.password,
      user,
      token;

    identity.authenticateUser(userName, password)
      .then(function(data) {
        user = data;
        if (user.token) {
          return new Promise(function(resolve) {
            resolve({
              user: user,
              token: {
                token: user.token
              }
            });
          });
        } else {
          return identity.generateToken(user);
        }
      })
      .then(function(data) {
        user = data.user;
        token = data.token;

        user.token = token.token;
        user.save(function(err) {
          if (err) {
            next(err.message);
            return;
          }

          res.send(token.token);
        });
      })
      .catch(function(err) {
        console.log(err);
        res.status(400)
          .json(err);
      });
  }
};
